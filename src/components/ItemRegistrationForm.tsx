
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInventory } from '@/context/InventoryContext';
import { Plus } from 'lucide-react';

const ItemRegistrationForm = () => {
  const { currentScannedUID, addItem } = useInventory();
  const [productName, setProductName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentScannedUID) {
      return;
    }

    addItem({
      uid: currentScannedUID,
      name: productName,
      expiryDate: expiryDate,
    });

    // Reset form
    setProductName('');
    setExpiryDate('');
  };

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg overflow-hidden animate-scale-in">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
          Register New Item
        </CardTitle>
        <CardDescription>
          Assign details to the scanned RFID tag
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 p-6">
          <div className="space-y-3 transition-all duration-300">
            <Label htmlFor="productName" className="text-sm font-medium">Product Name</Label>
            <Input
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              required
              disabled={!currentScannedUID}
              className="transition-all duration-200 focus:ring-primary"
            />
          </div>
          <div className="space-y-3 transition-all duration-300">
            <Label htmlFor="expiryDate" className="text-sm font-medium">Expiry Date</Label>
            <Input
              id="expiryDate"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
              disabled={!currentScannedUID}
              className="transition-all duration-200 focus:ring-primary"
            />
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-2">
          <Button 
            type="submit" 
            className="w-full transition-all duration-300 hover:shadow-md"
            disabled={!currentScannedUID || !productName || !expiryDate}
          >
            Register Item
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ItemRegistrationForm;
