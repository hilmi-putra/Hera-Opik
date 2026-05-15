import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  groom_name: z.string().min(1, "Required"),
  bride_name: z.string().min(1, "Required"),
  groom_nickname: z.string(),
  bride_nickname: z.string(),
  wedding_date: z.string().min(1, "Required"),
  hero_image_url: z.string(),
  story_text_en: z.string(),
  story_text_id: z.string(),
  timezone: z.string(),
});

export function ConfigPage() {
  const queryClient = useQueryClient();

  const { data: config, isLoading } = useQuery({
    queryKey: ['wedding_config'],
    queryFn: async () => {
      const { data, error } = await supabase.from('wedding_config').select('*').limit(1).maybeSingle();
      if (error) throw error;
      return data;
    }
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      groom_name: config?.groom_name || "",
      bride_name: config?.bride_name || "",
      groom_nickname: config?.groom_nickname || "",
      bride_nickname: config?.bride_nickname || "",
      wedding_date: config?.wedding_date ? new Date(config.wedding_date).toISOString().slice(0, 16) : "",
      hero_image_url: config?.hero_image_url || "",
      story_text_en: config?.story_text_en || "",
      story_text_id: config?.story_text_id || "",
      timezone: config?.timezone || "Asia/Jakarta",
    }
  });

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      if (config?.id) {
        const { error } = await supabase.from('wedding_config').update(values).eq('id', config.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('wedding_config').insert([values]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wedding_config'] });
      toast.success("Configuration saved successfully.");
    },
    onError: (error) => {
      toast.error(`Error saving config: ${error.message}`);
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wedding Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="groom_name" render={({ field }) => (
                <FormItem><FormLabel>Groom Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="bride_name" render={({ field }) => (
                <FormItem><FormLabel>Bride Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="groom_nickname" render={({ field }) => (
                <FormItem><FormLabel>Groom Nickname</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="bride_nickname" render={({ field }) => (
                <FormItem><FormLabel>Bride Nickname</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="wedding_date" render={({ field }) => (
                <FormItem><FormLabel>Wedding Date & Time</FormLabel><FormControl><Input type="datetime-local" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="timezone" render={({ field }) => (
                <FormItem><FormLabel>Timezone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <FormField control={form.control} name="hero_image_url" render={({ field }) => (
              <FormItem><FormLabel>Hero Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="story_text_en" render={({ field }) => (
              <FormItem><FormLabel>Story (English)</FormLabel><FormControl><Textarea rows={4} {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="story_text_id" render={({ field }) => (
              <FormItem><FormLabel>Story (Indonesian)</FormLabel><FormControl><Textarea rows={4} {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <Button type="submit" disabled={mutation.isPending}>Save Configuration</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
