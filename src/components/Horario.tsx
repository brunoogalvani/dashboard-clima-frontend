import { useEffect, useState } from "react";
import { DateTime } from "luxon";

export default function Horario({ fuso }: { fuso: string }) {
  const [hora, setHora] = useState(DateTime.now().setZone(fuso));

  useEffect(() => {
    let interval = setInterval(() => {
      setHora(DateTime.now().setZone(fuso));
    }, 1000);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(interval);
      } else {
        setHora(DateTime.now().setZone(fuso));
        interval = setInterval(() => {
          setHora(DateTime.now().setZone(fuso));
        }, 1000);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fuso]);

  return (
    <>
      {hora.toFormat("yyyy-MM-dd HH:mm")}
    </>
  );
}
