import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CreditsRechargeCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Credits Recharge</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input type="number" placeholder="Amount" />
        <Button className="w-full">Recharge</Button>
      </CardContent>
    </Card>
  );
}

export default CreditsRechargeCard;