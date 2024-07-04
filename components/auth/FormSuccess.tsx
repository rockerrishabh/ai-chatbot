import { CheckCircle2Icon } from "lucide-react";

type Props = {
  message: string | undefined;
};

function FormSuccess({ message }: Props) {
  if (!message) return null;

  return (
    <section className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <CheckCircle2Icon className="w-4 h-4" />
      <p>{message}</p>
    </section>
  );
}

export default FormSuccess;
