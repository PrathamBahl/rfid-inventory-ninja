
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useInventory } from '@/context/InventoryContext';
import { Database } from 'lucide-react';

const RFIDScanner = () => {
  const { currentScannedUID, simulateScan } = useInventory();

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg overflow-hidden animate-scale-in">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
          RFID Scanner
        </CardTitle>
        <CardDescription>
          Scan an RFID tag to add it to your inventory
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex flex-col gap-3">
            <div className="bg-muted rounded-lg overflow-hidden transition-all duration-300 shadow-sm hover:shadow">
              <div className="p-4 flex items-center justify-between">
                <span className="font-mono text-sm transition-all duration-200">
                  {currentScannedUID ? currentScannedUID : 'No RFID tag detected'}
                </span>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={simulateScan}
                  className="transition-all duration-300 hover:scale-105"
                >
                  Simulate Scan
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground italic">
              Note: This is a simulation. In a real application, this would connect to an RFID reader.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RFIDScanner;
