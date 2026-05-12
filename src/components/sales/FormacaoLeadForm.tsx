import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Send, User, Mail, Briefcase } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  area: z.string().min(1, "Selecione sua área de atuação"),
});

export function FormacaoLeadForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      area: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success("Inscrição enviada!", {
      description: "Em breve nossa equipe entrará em contato com você.",
    });
    form.reset();
  }

  return (
    <div className="glass-card p-8 rounded-3xl border border-primary/20 bg-background/50 backdrop-blur-xl shadow-2xl">
      <div className="mb-8">
        <h3 className="text-2xl font-heading font-bold mb-2">Interessado na Formação?</h3>
        <p className="text-muted-foreground text-sm">Deixe seus dados e receba informações exclusivas sobre a próxima turma.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-left">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" /> Nome Completo
                </FormLabel>
                <FormControl>
                  <Input placeholder="Seu nome aqui" className="bg-background/50 border-border/50 focus:border-primary/50 h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" /> E-mail Profissional
                </FormLabel>
                <FormControl>
                  <Input placeholder="seu@email.com" className="bg-background/50 border-border/50 focus:border-primary/50 h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" /> Área de Atuação
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary/50 h-12">
                      <SelectValue placeholder="Selecione sua área" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-card/95 backdrop-blur-md border-border/50">
                    <SelectItem value="psicologia">Psicologia / Psicanálise</SelectItem>
                    <SelectItem value="terapia">Terapia Holística</SelectItem>
                    <SelectItem value="educacao">Educação / Pedagogia</SelectItem>
                    <SelectItem value="rh">RH / Coaching</SelectItem>
                    <SelectItem value="outro">Outra área</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl group" disabled={form.formState.isSubmitting}>
            Quero receber informações <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
