import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { weddingData } from "@/lib/data";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  message: z.string().min(5, "Message must be at least 5 characters."),
});

export function WishesSection() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    alert("Wish Sent! Thank you.");
    form.reset();
  }

  return (
    <section className="py-20 px-6 bg-wedding-pink/20 text-center relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto"
      >
        <h2 className="font-display text-3xl font-bold text-wedding-green mb-4">Wedding Wishes</h2>
        <p className="text-sm text-wedding-green/70 mb-8">Send your prayers and best wishes</p>
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-wedding-green/10 mb-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-left">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Your Name" className="rounded-xl border-wedding-green/20 focus-visible:ring-wedding-green bg-wedding-cream" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea 
                        placeholder="Write your wishes here..." 
                        className="resize-none rounded-xl border-wedding-green/20 focus-visible:ring-wedding-green bg-wedding-cream h-24" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-wedding-green hover:bg-wedding-green/90 text-white rounded-xl font-medium">
                Send Wish
              </Button>
            </form>
          </Form>
        </div>

        {/* Wishes List */}
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar text-left">
          {weddingData.wishes.map((wish, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-4 rounded-2xl shadow-sm border border-wedding-green/5"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-wedding-green text-sm">{wish.name}</span>
                <span className="text-[10px] text-wedding-green/50">
                  {new Date(wish.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-wedding-green/80 leading-relaxed">{wish.message}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
