import { cn } from "@/lib/utils";

interface PageProps {
  children: React.ReactNode;
  className?: string;
}

export const Page = (props: PageProps) => {
  return (
    <div
      className={cn(
        "w-full min-h-full flex py-5 px-6 lg:py-8 lg:px-14 xl:py-10 xl:px-[8%]",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};
