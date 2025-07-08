import { cantusSections } from "./whitman";
import { getWeek, format, add } from "date-fns";
import {
  GlowingStarsBackgroundCard,
  GlowingStarsTitle,
  GlowingStarsDescription,
} from "./glowing-stars";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./button";
import { WeekSelector } from "./week-selector";
import { useRef, useEffect, useState } from "react";

const weekNumber = getWeek(new Date());
const currentDate = format(new Date(), "d MMMM yyyy");

const CantusWeek = () => {
  const [week, setWeek] = useState(weekNumber);
  const topElementRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    requestAnimationFrame(() => {
      topElementRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const handleNextWeek = () => {
    setWeek(prevWeek => prevWeek + 1);
    scrollToTop();
  };
  const handlePrevWeek = () => {
    setWeek(prevWeek => prevWeek - 1);
    scrollToTop();
  };
  const handleNow = () => {
    setWeek(weekNumber);
  };
  const [cantusIsVisible, setCantusIsVisible] = useState(false);

  const leftSubtitle = week === weekNumber ? "Current Week" : "Week Number";

  const rightSubtitle = (targetWeek: number) => {
    if (targetWeek === weekNumber) {
      return currentDate;
    } else {
      const discrepancy = targetWeek - weekNumber;
      const alteredDate = add(new Date(), { days: 7 * discrepancy });
      return format(alteredDate, "d MMMM yyyy");
    }
  };

  const handleFirst = () => {
    setWeek(1);
  };

  // for scrolling from hidden leaf icon

  useEffect(() => {
    const handleScrollToCantus = () => {
      setCantusIsVisible(true);
      scrollToTop();
    };

    window.addEventListener("scrollToCantus", handleScrollToCantus);
    return () =>
      window.removeEventListener("scrollToCantus", handleScrollToCantus);
  }, []);

  // for scrolling from hidden leaf icon

  const WeekSelectingIcons = ({
    searchvisible = true,
  }: {
    searchvisible?: boolean;
  }) => {
    return (
      <div className="flex justify-evenly items-end mt-2 transition-opacity duration-[400ms] ease-in-out hover:opacity-100 opacity-90">
        <Button
          onClick={handlePrevWeek}
          variant={"ghostLine"}
          size={"icon"}
          disabled={week === 1}
          className="cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="w-[300px] flex justify-center items-center">
          {searchvisible ? (
            <WeekSelector
              value={week.toString()}
              onChange={val => {
                setWeek(parseInt(val));
                scrollToTop();
              }}
            />
          ) : (
            <div className="w-[300px] flex items-center justify-center text-center gap-2 opacity-100">
              <p
                className="whitespace-nowrap text-sm text-muted-foreground ml-3 md:ml-0 cursor-pointer"
                onClick={handleNow}
              >
                {leftSubtitle}
              </p>
              <GlowingStarsTitle className="mx-auto" action={handleFirst}>
                <p className="poetry-text cursor-pointer">{toRoman(week)}</p>
              </GlowingStarsTitle>
              <p
                className="whitespace-nowrap text-sm text-muted-foreground mr-3 md:mr-0 cursor-pointer"
                onClick={handleNow}
              >
                {rightSubtitle(week)}
              </p>
            </div>
          )}
        </div>
        <Button
          onClick={handleNextWeek}
          variant={"ghostLine"}
          size={"icon"}
          disabled={week === 52}
          className="cursor-pointer"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    );
  };
  return (
    <div
      ref={topElementRef}
      className={`flex py-20 items-center justify-center antialiased w-full h-full ${
        cantusIsVisible ? "block" : "hidden"
      }`}
    >
      <GlowingStarsBackgroundCard>
        <WeekSelectingIcons searchvisible={false} />
        <div className="poetry-text-responsive flex justify-center items-center mt-4 px-8 sm:px-12 md:px-12">
          <GlowingStarsDescription>
            {/* <p className="text-xl leading-relaxed opacity-80 lg:opacity-85 dark:opacity-65 dark:sm:opacity-70 dark:md:opacity-75 dark:lg:opacity-85"> */}
            <p className="text-xl leading-relaxed opacity-85 lg:opacity-100 dark:opacity-82 dark:sm:opacity-88 dark:lg:opacity-95">
              {/* opacty variation May need refining, or opening up to customization.  */}
              {cantusSections[week - 1].map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </GlowingStarsDescription>
        </div>
        <WeekSelectingIcons />
      </GlowingStarsBackgroundCard>
    </div>
  );
};

export default CantusWeek;

const toRoman = (num: number): string => {
  if (num <= 0 || num >= 53) return num.toString();

  const romanMap: [number, string][] = [
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  return romanMap.reduce((acc, [value, numeral]) => {
    while (num >= value) {
      acc += numeral;
      num -= value;
    }
    return acc;
  }, "");
};
