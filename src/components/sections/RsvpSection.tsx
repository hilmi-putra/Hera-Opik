import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  attendance: z.enum(["yes", "no"]),
  guests: z.string().min(1, "Please select number of guests"),
  message: z.string().optional(),
});

export function RsvpSection() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      attendance: "yes",
      guests: "1",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Submit logic goes here
    alert("RSVP Submitted! Thank you.");
    form.reset();
  }

  return (
    <section className="py-20 px-6 bg-wedding-cream text-center relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto bg-white p-8 rounded-[40px] shadow-sm border border-wedding-green/10"
      >
        <h2 className="font-display text-3xl font-bold text-wedding-green mb-4">RSVP</h2>
        <p className="text-sm text-wedding-green/70 mb-8">Please confirm your attendance</p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-left">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-wedding-green">Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" className="rounded-xl border-wedding-green/20 focus-visible:ring-wedding-green bg-wedding-cream" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="attendance"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-wedding-green">Will you attend?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0 p-3 rounded-xl border border-wedding-green/20 bg-wedding-cream">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal w-full cursor-pointer">
                          Yes, I will attend
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0 p-3 rounded-xl border border-wedding-green/20 bg-wedding-cream">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal w-full cursor-pointer">
                          Sorry, I can't attend
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="guests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-wedding-green">Number of Guests</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-xl border-wedding-green/20 focus:ring-wedding-green bg-wedding-cream">
                        <SelectValue placeholder="Select guests" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1 Person</SelectItem>
                      <SelectItem value="2">2 Persons</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-wedding-green">Wishes / Messages</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Write your wishes for the couple" 
                      className="resize-none rounded-xl border-wedding-green/20 focus-visible:ring-wedding-green bg-wedding-cream h-24" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-wedding-green hover:bg-wedding-green/90 text-white rounded-xl py-6 font-medium text-lg">
              Confirm RSVP
            </Button>
          </form>
        </Form>
      </motion.div>
    </section>
  );
}
