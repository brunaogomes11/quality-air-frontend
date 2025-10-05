export const Notification = ({ notification }: { notification: string }) => {
  const textColor = notification ? "text-destructive" : "text-muted-foreground";

  return (
    <div className={notification ? "h-3" : "hidden"}>
      <p className={`text-xs ${textColor}`}>{notification}</p>
    </div>
  );
};
