import { Skeleton } from "@/components/ui/skeleton";

const Placeholder = () => {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-4 w-[300px]" />
      <Skeleton className="h-4 w-[400px]" />
      <Skeleton className="h-4 w-[250px]" />
    </div>
  );
};

export default Placeholder;
