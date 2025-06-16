import { useState, useEffect } from 'react';
import socketIO from 'socket.io-client';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Package, Plus, Trash2, Edit2, Save, X } from 'lucide-react';

// Socket configuration
const socket = socketIO("ws://localhost:5175", {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 20,
  reconnectionDelay: 5000,
  timeout: 30000,
});

// UID extraction function
const extractUID = (message: string) => {
  const match = message.match(/([A-Fa-f0-9]{6,}|\d{1,3}-\d{1,3}-\d{1,3}-\d{1,3})/);
  return match ? match[0] : null;
};

export function Inventory() {
  const [rfidList, setRfidList] = useState<string[]>([]);
  const [assignments, setAssignments] = useState<Record<string, { name: string; expiry: string }>>({});
  const [inventory, setInventory] = useState<Array<{ uid: string; name: string; expiry: string }>>([]);
  const [editingItem, setEditingItem] = useState<{ uid: string; name: string; expiry: string } | null>(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ WebSocket Connected!");
    });

    socket.on("rfid_scanned", (data) => {
      const uid = extractUID(data.uid);
      if (uid) {
        console.log("RFID UID Received:", uid);
        setRfidList((prev) => [...new Set([...prev, uid])]);
      } else {
        console.log("❌ Ignored Non-UID Data:", data.uid);
      }
    });

    socket.on("connect_error", (err) => {
      console.error("❌ WebSocket Connection Error:", err);
      toast.error("Failed to connect to RFID scanner");
    });

    socket.on("disconnect", () => {
      console.warn("⚠️ WebSocket Disconnected! Trying to reconnect...");
      toast.warning("RFID scanner disconnected. Attempting to reconnect...");
    });

    return () => {
      socket.off("rfid_scanned");
      socket.off("connect_error");
      socket.off("disconnect");
    };
  }, []);

  const handleAssign = (uid: string, name: string, expiry: string) => {
    if (!name || !expiry) {
      toast.error("Please fill in both name and expiry date");
      return;
    }

    setAssignments((prev) => ({ ...prev, [uid]: { name, expiry } }));
    setInventory((prev) => [...prev, { uid, name, expiry }]);
    setRfidList((prev) => prev.filter((id) => id !== uid));
    toast.success("Item assigned successfully");
  };

  const handleDelete = (uid: string) => {
    setInventory((prev) => prev.filter((item) => item.uid !== uid));
    toast.success("Item deleted successfully");
  };

  const handleUpdate = (uid: string, name: string, expiry: string) => {
    if (!name || !expiry) {
      toast.error("Please fill in both name and expiry date");
      return;
    }

    setInventory((prev) =>
      prev.map((item) =>
        item.uid === uid ? { ...item, name, expiry } : item
      )
    );
    setEditingItem(null);
    toast.success("Item updated successfully");
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="bg-white/50 backdrop-blur-sm border-2">
        <CardHeader>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            RFID Inventory Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Scanned UIDs Section */}
          {rfidList.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Package className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Scanned UIDs</h3>
              </div>
              <div className="grid gap-4">
                {rfidList.map((uid) => (
                  <Card key={uid} className="bg-gradient-to-r from-blue-50 to-purple-50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="font-mono text-lg">{uid}</div>
                        <div className="flex-1 flex gap-2">
                          <Input
                            placeholder="Assign Name"
                            value={assignments[uid]?.name || ''}
                            onChange={(e) =>
                              setAssignments((prev) => ({
                                ...prev,
                                [uid]: { ...prev[uid], name: e.target.value },
                              }))
                            }
                            className="flex-1"
                          />
                          <Input
                            type="date"
                            value={assignments[uid]?.expiry || ''}
                            onChange={(e) =>
                              setAssignments((prev) => ({
                                ...prev,
                                [uid]: { ...prev[uid], expiry: e.target.value },
                              }))
                            }
                            className="flex-1"
                          />
                          <Button
                            onClick={() => handleAssign(uid, assignments[uid]?.name || '', assignments[uid]?.expiry || '')}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Assign
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Inventory Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Current Inventory</h3>
            </div>
            {inventory.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No items in inventory
              </div>
            ) : (
              <div className="rounded-lg border-2 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>RFID UID</TableHead>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventory.map((item) => (
                      <TableRow key={item.uid} className="hover:bg-gray-50">
                        <TableCell className="font-mono">{item.uid}</TableCell>
                        <TableCell>
                          {editingItem?.uid === item.uid ? (
                            <Input
                              value={editingItem.name}
                              onChange={(e) =>
                                setEditingItem({ ...editingItem, name: e.target.value })
                              }
                            />
                          ) : (
                            item.name || "Not Assigned"
                          )}
                        </TableCell>
                        <TableCell>
                          {editingItem?.uid === item.uid ? (
                            <Input
                              type="date"
                              value={editingItem.expiry}
                              onChange={(e) =>
                                setEditingItem({
                                  ...editingItem,
                                  expiry: e.target.value,
                                })
                              }
                            />
                          ) : (
                            item.expiry ? format(new Date(item.expiry), 'PPP') : "Not Set"
                          )}
                        </TableCell>
                        <TableCell>
                          {editingItem?.uid === item.uid ? (
                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleUpdate(editingItem.uid, editingItem.name, editingItem.expiry)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Save className="h-4 w-4 mr-2" />
                                Save
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => setEditingItem(null)}
                              >
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                onClick={() =>
                                  setEditingItem({
                                    uid: item.uid,
                                    name: item.name,
                                    expiry: item.expiry,
                                  })
                                }
                              >
                                <Edit2 className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={() => handleDelete(item.uid)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 