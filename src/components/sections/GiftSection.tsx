import { useState } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/data";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function GiftSection() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section className="py-20 px-6 bg-wedding-pink/10 text-center relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto"
      >
        <h2 className="font-display text-3xl font-bold text-wedding-green mb-4">Wedding Gift</h2>
        <p className="text-sm text-wedding-green/70 mb-12">
          Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, you may send it through:
        </p>
        
        <div className="space-y-6">
          {weddingData.bankAccounts.map((account, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-3xl shadow-sm border border-wedding-green/10"
            >
              <h3 className="font-display text-xl font-bold text-wedding-green mb-1">{account.bank}</h3>
              <p className="text-sm text-wedding-green/80 mb-4">{account.name}</p>
              
              <div className="flex items-center justify-between bg-wedding-cream p-4 rounded-2xl">
                <span className="font-mono text-lg font-medium text-wedding-green tracking-wider">{account.number}</span>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  onClick={() => handleCopy(account.number, index)}
                  className="text-wedding-green hover:bg-wedding-pink/50 hover:text-wedding-green rounded-full"
                >
                  {copiedIndex === index ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
