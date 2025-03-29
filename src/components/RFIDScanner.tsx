
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useInventory } from '@/context/InventoryContext';
import { Database } from 'lucide-react';

const RFIDScanner = () => {
  const { currentScannedUID, simulateScan } = useInventory();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          RFID Scanner
        </CardTitle>
        <CardDescription>
          Scan an RFID tag to add it to your inventory
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <div className="bg-muted p-4 rounded-md flex items-center justify-between">
              <span className="font-mono text-sm">
                {currentScannedUID ? currentScannedUID : 'No RFID tag detected'}
              </span>
              <Button variant="secondary" size="sm" onClick={simulateScan}>
                Simulate Scan
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Note: This is a simulation. In a real application, this would connect to an RFID reader.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RFIDScanner;
