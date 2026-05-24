import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Save, Settings } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

const inputClass = "h-11 rounded-2xl border-[#F8E9E7] bg-white focus-visible:ring-[#D65B4C]";
const textareaClass = "min-h-32 rounded-2xl border-[#F8E9E7] bg-white focus-visible:ring-[#D65B4C]";

export function ConfigPage() {
  const queryClient = useQueryClient();

  const { data: config, isLoading } = useQuery({
    queryKey: ["wedding-config"],
    queryFn: api.weddingConfig,
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
    },
  });

  const mutation = useMutation({
    mutationFn: api.updateWeddingConfig,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wedding-config"] });
      toast.success("Configuration saved successfully.");
    },
    onError: (error) => {
      toast.error(`Error saving config: ${error.message}`);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  if (isLoading) {
    return (
      <Card className="border-[#F8E9E7] bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="h-6 w-48 animate-pulse rounded-full bg-[#F8E9E7]" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-11 animate-pulse rounded-2xl bg-slate-100" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 rounded-[2rem] border border-[#F8E9E7] bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F8E9E7] text-[#822935]">
            <Settings className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-sans text-2xl font-bold tracking-tight text-slate-950">Wedding Configuration</h2>
            <p className="mt-1 text-sm text-slate-500">Atur data utama undangan, hero image, tanggal, dan cerita.</p>
          </div>
        </div>
      </section>

      <Card className="border-[#F8E9E7] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="font-sans text-lg font-bold text-slate-950">Informasi Utama</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField control={form.control} name="groom_name" render={({ field }) => (
                  <FormItem><FormLabel>Groom Full Name</FormLabel><FormControl><Input className={inputClass} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="bride_name" render={({ field }) => (
                  <FormItem><FormLabel>Bride Full Name</FormLabel><FormControl><Input className={inputClass} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="groom_nickname" render={({ field }) => (
                  <FormItem><FormLabel>Groom Nickname</FormLabel><FormControl><Input className={inputClass} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="bride_nickname" render={({ field }) => (
                  <FormItem><FormLabel>Bride Nickname</FormLabel><FormControl><Input className={inputClass} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="wedding_date" render={({ field }) => (
                  <FormItem><FormLabel>Wedding Date & Time</FormLabel><FormControl><Input type="datetime-local" className={inputClass} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="timezone" render={({ field }) => (
                  <FormItem><FormLabel>Timezone</FormLabel><FormControl><Input className={inputClass} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>

              <FormField control={form.control} name="hero_image_url" render={({ field }) => (
                <FormItem><FormLabel>Hero Image URL</FormLabel><FormControl><Input className={inputClass} {...field} /></FormControl><FormMessage /></FormItem>
              )} />

              <div className="grid gap-4 lg:grid-cols-2">
                <FormField control={form.control} name="story_text_en" render={({ field }) => (
                  <FormItem><FormLabel>Story (English)</FormLabel><FormControl><Textarea className={textareaClass} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="story_text_id" render={({ field }) => (
                  <FormItem><FormLabel>Story (Indonesian)</FormLabel><FormControl><Textarea className={textareaClass} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={mutation.isPending} className="h-11 rounded-2xl bg-[#D65B4C] px-5 text-white hover:bg-[#BF4E41]">
                  {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save Configuration
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
