import { cantusSections, lineNumberStartValue } from "./whitman";
import { getWeek, format, add } from "date-fns";
import {
  GlowingStarsBackgroundCard,
  GlowingStarsTitle,
  GlowingStarsDescription,
} from "./glowing-stars";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./button";
import { FULL_TEXT, WeekSelector } from "./week-selector";
import { useRef, useEffect, useState } from "react";
import { useInView } from "motion/react";

const weekNumber = getWeek(new Date());
const currentDate = format(new Date(), "d MMMM yyyy");

const CantusWeek = () => {
  const [week, setWeek] = useState<number | "All">(weekNumber);
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
    setWeek(prevWeek => Number(prevWeek) + 1);
    scrollToTop();
  };
  const handlePrevWeek = () => {
    setWeek(prevWeek => Number(prevWeek) - 1);
    scrollToTop();
  };
  const handleNow = () => {
    setWeek(weekNumber);
  };

  const [cantusIsVisible, setCantusIsVisible] = useState(false);
  const [lineNumbersAreVisible, setlineNumbersAreVisible] = useState(false);

  const leftSubtitle =
    week === weekNumber
      ? "Current Week"
      : week === FULL_TEXT
      ? "W. Whitman"
      : "Week Number";

  const rightSubtitle = (targetWeek: number | string) => {
    if (targetWeek === FULL_TEXT) {
      return currentDate;
    }
    if (targetWeek === weekNumber) {
      return currentDate;
    } else {
      const discrepancy = Number(targetWeek) - weekNumber;
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

  type FadeInTitleProps = {
    children: React.ReactNode;
    once?: boolean;
  };

  const FadeInTitle = ({ children, once = false }: FadeInTitleProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
      amount: "all",
      once,
    });

    return (
      <GlowingStarsTitle className="mx-auto">
        <p
          ref={ref}
          className={`poetry-text transition-opacity duration-1500 ease-in-out ${
            isInView ? "opacity-100" : "opacity-75"
          }`}
        >
          {children}
        </p>
      </GlowingStarsTitle>
    );
  };

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
          disabled={week === 1 || week === FULL_TEXT}
          className="cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="w-[300px] flex justify-center items-center">
          {searchvisible ? (
            <WeekSelector
              value={week.toString()}
              onChange={val => {
                setWeek(val === FULL_TEXT ? val : parseInt(val));
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
                <p className="poetry-text cursor-pointer">
                  {week === FULL_TEXT ? `CANTUS` : toRoman(week)}
                </p>
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
          disabled={week === 1 || week === FULL_TEXT}
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
        <div className="poetry-text-responsive flex justify-center items-center mt-4">
          <GlowingStarsDescription>
            <div className="text-xl leading-relaxed opacity-85 lg:opacity-100 dark:opacity-82 dark:sm:opacity-88 dark:lg:opacity-95">
              <div
                className="relative group"
                onClick={() =>
                  setlineNumbersAreVisible(
                    !lineNumbersAreVisible ? true : false
                  )
                }
              >
                {(() => {
                  let lineCounter = lineNumberStartValue(
                    week === FULL_TEXT ? 1 : week
                  );
                  let lastLineEmpty = true;

                  const singleSection = (line: string, index: number) => {
                    const showLineNumber =
                      line !== "" && (index === 0 || lastLineEmpty);

                    const margins = (isHidden = false) => (
                      <div
                        className={`min-w-[2rem] max-w-[6rem] flex justify-center items-center pr-2 relative ${
                          isHidden ? "invisible" : ""
                        } transition-opacity duration-[400ms] ease-in-out group-hover:opacity-100 ${
                          lineNumbersAreVisible ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {showLineNumber && (
                          <span className="text-sm text-muted-foreground align-baseline relative top-[4px]">
                            {lineCounter}
                          </span>
                        )}
                      </div>
                    );

                    const element = (
                      <div key={index} className="flex items-start">
                        {margins()}
                        <div className="poetry-line flex-1">
                          {line}
                          <br />
                        </div>
                        {margins(true)}
                      </div>
                    );

                    if (line !== "") lineCounter++;
                    lastLineEmpty = line === "";

                    return element;
                  };

                  if (week !== FULL_TEXT) {
                    return cantusSections[week - 1].map((line, index) => {
                      return singleSection(line, index);
                    });
                  }

                  // const FadeInTitle = ({
                  //   children,
                  // }: {
                  //   children: React.ReactNode;
                  // }) => {
                  //   const ref = useRef(null);
                  //   const isInView = useInView(ref, {
                  //     amount: "all",
                  //     once: false,
                  //   });

                  //   return (
                  //     <GlowingStarsTitle className="mx-auto">
                  //       <p
                  //         ref={ref}
                  //         className={`poetry-text transition-opacity duration-1500 ease-in-out ${
                  //           isInView ? "opacity-100" : "opacity-65"
                  //         }`}
                  //       >
                  //         {children}
                  //       </p>
                  //     </GlowingStarsTitle>
                  //   );
                  // };

                  if (week === FULL_TEXT) {
                    return cantusSections.map((section, index) => {
                      let sectionNumber = index;
                      return section.map((line, index) => {
                        return (
                          <>
                            {index === 0 && (
                              <FadeInTitle>
                                {toRoman(sectionNumber + 1)}
                              </FadeInTitle>
                            )}
                            {singleSection(line, index)}
                          </>
                        );
                      });
                    });
                  }
                })()}
              </div>
            </div>
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
