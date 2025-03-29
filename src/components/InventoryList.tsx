
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useInventory } from '@/context/InventoryContext';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { X } from 'lucide-react';

const InventoryList = () => {
  const { items, deleteItem } = useInventory();

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
    } catch (error) {
      return 'Unknown';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Inventory Items</CardTitle>
        <CardDescription>
          Manage your RFID tagged items
        </CardDescription>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No items in inventory. Scan an RFID tag to add items.
          </div>
        ) : (
          <div className="space-y-2">
            <div className="grid inventory-grid font-medium text-sm px-4 py-2 bg-muted rounded-t-md">
              <div>Product</div>
              <div className="hidden sm:block">RFID UID</div>
              <div>Expires</div>
              <div className="text-right">Action</div>
            </div>
            <div className="divide-y">
              {items.map((item) => (
                <div key={item.id} className="grid inventory-grid px-4 py-3 items-center">
                  <div className="font-medium">
                    {item.name}
                    <div className="text-xs text-muted-foreground">Added {getTimeAgo(item.addedAt)}</div>
                  </div>
                  <div className="hidden sm:block text-sm font-mono truncate">{item.uid}</div>
                  <div className="text-sm">
                    {formatDate(item.expiryDate)}
                  </div>
                  <div className="flex justify-end">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => deleteItem(item.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InventoryList;
