
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
    <Card className="w-full animate-fade-in shadow transition-all duration-300 hover:shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardTitle>Inventory Items</CardTitle>
        <CardDescription>
          Manage your RFID tagged items
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {items.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg font-medium mb-2">No items in inventory</p>
            <p className="text-sm">Scan an RFID tag to add items.</p>
          </div>
        ) : (
          <div className="space-y-0">
            <div className="grid inventory-grid font-medium text-sm px-4 py-3 bg-muted/50 border-b">
              <div>Product</div>
              <div className="hidden sm:block">RFID UID</div>
              <div>Expires</div>
              <div className="text-right">Action</div>
            </div>
            <div className="divide-y">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className="grid inventory-grid px-4 py-3 items-center transition-colors duration-200 hover:bg-muted/30"
                >
                  <div className="font-medium">
                    {item.name}
                    <div className="text-xs text-muted-foreground">Added {getTimeAgo(item.addedAt)}</div>
                  </div>
                  <div className="hidden sm:block text-sm font-mono truncate opacity-70">{item.uid}</div>
                  <div className="text-sm">
                    {formatDate(item.expiryDate)}
                  </div>
                  <div className="flex justify-end">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => deleteItem(item.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-200 hover:scale-110"
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
