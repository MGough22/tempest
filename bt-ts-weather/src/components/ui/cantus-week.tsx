import {
  cantusSections1855,
  cantusSections1892,
  lineNumberStartValue,
} from "./whitman";
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
  const [edition, setEdition] = useState<string[][]>(cantusSections1892);
  const [editionYear, setEditionYear] = useState<number>(1892);
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

  const handleEditionChange = () => {
    const isIt1892 = editionYear === 1892;
    setEdition(isIt1892 ? cantusSections1855 : cantusSections1892);
    setEditionYear(isIt1892 ? 1855 : 1892);
  };

  useEffect(() => {
    const handleScrollToCantus = () => {
      setCantusIsVisible(true);
      scrollToTop();
    };

    window.addEventListener("scrollToCantus", handleScrollToCantus);
    return () =>
      window.removeEventListener("scrollToCantus", handleScrollToCantus);
  }, []);

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
      <GlowingStarsTitle
        className="mx-auto flex items-center justify-center gap-2"
        // action={handleEditionChange} TODO later if scroll anchoring feels natural on mutating texts.
      >
        <span
          className={`transition-opacity duration-2000 ease-in-out ${
            isInView ? "opacity-50" : "opacity-0"
          }`}
        >
          ·
        </span>
        <p
          ref={ref}
          className={`poetry-text transition-opacity duration-1500 ease-in-out ${
            isInView ? "opacity-100" : "opacity-75"
          }`}
        >
          {children}
        </p>
        <span
          className={`transition-opacity duration-2000 ease-in-out ${
            isInView ? "opacity-50" : "opacity-0"
          }`}
        >
          ·
        </span>
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
              <GlowingStarsTitle
                className="mx-auto"
                action={handleEditionChange}
              >
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
          disabled={week === FULL_TEXT || week === edition.length}
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
        <div data-gate="true">
          <WeekSelectingIcons searchvisible={false} />
        </div>
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
                    week === FULL_TEXT ? 1 : week,
                    edition
                  );
                  let lastLineEmpty = true;

                  const singleLine = (
                    line: string,
                    index: number,
                    left: boolean = true,
                    isCeleber: boolean = false
                  ) => {
                    const showLineNumber =
                      line !== "" && (index === 0 || lastLineEmpty);

                    const margins = (isHidden = false) => (
                      <div
                        className={`min-w-[2rem] max-w-[6rem] flex justify-center items-center pr-2 relative ${
                          isHidden ? "invisible" : ""
                        } transition-opacity duration-[400ms] ease-in-out group-hover:opacity-100 ${
                          lineNumbersAreVisible ? "opacity-100" : "opacity-0"
                        }`}
                        style={{ willChange: "opacity" }}
                      >
                        {showLineNumber && (
                          <span className="text-sm text-muted-foreground align-baseline relative top-[4px]">
                            {lineCounter}
                          </span>
                        )}
                      </div>
                    );

                    const preserveElliptics = (text: string) => {
                      return text.replace(/(\. ?){2,}/g, match =>
                        match.replace(/ /g, "\u00A0")
                      );
                    };

                    const applyDropCap = (
                      text: string,
                      apply: boolean,
                      index: number
                    ) => {
                      if (
                        !apply ||
                        !text.trim() ||
                        text[0] === "(" ||
                        text.includes("*") // TODO add * to source text lines to exempt from this styling.
                      )
                        return text;

                      const firstVisibleIndex = text.search(/\S/);
                      const firstLetter = text[firstVisibleIndex];
                      const before = text.slice(0, firstVisibleIndex);
                      const after = text.slice(firstVisibleIndex + 1);

                      const dynamicCapSize =
                        index === 0
                          ? "text-5xl"
                          : index < 6
                          ? "text-4xl"
                          : "text-3xl";

                      const dynamicMarginBottom =
                        index === 0
                          ? "-1.5rem"
                          : index < 6
                          ? "-1rem"
                          : "-0.5rem";

                      const dynamicMarginRight =
                        index === 0 ? "mr-5" : index < 6 ? "mr-4.5" : "mr-4";

                      return (
                        <>
                          {before}
                          {/* opacity-50 => 80 depending on view. with an intial  */}
                          {/* the shadowing to simulate thickness across broswers behaved poorly on safari due to a forced re-paint tied with the opacity/hovers of line numbers, hence the willChange in their rendering*/}
                          <span
                            className={`drop-cap 
                              ${dynamicCapSize} 
                                [text-shadow:0_0_0.5px_currentColor] float-left leading-[0.8] ${dynamicMarginRight} mt-[2px] md:opacity-65 opacity-80 md:dark:opacity-75 dark:opacity-72`}
                            style={{
                              marginBottom: dynamicMarginBottom,
                            }}
                          >
                            {firstLetter}
                          </span>
                          {after}
                        </>
                      );
                    };

                    const renderedLine = () => {
                      let [tracked, untracked]: [string, string] = ["", ""];
                      if (isCeleber) {
                        const splitIncipit1855Index = line.indexOf("myself");
                        tracked = line.slice(0, splitIncipit1855Index);
                        untracked = line.slice(splitIncipit1855Index);
                      }

                      console.log("renderedLineIndex: ", index);
                      console.log("its first letter: ", line[0]);
                      console.log("line: ", line);

                      const getIndentClass = () => {
                        if (index === 1) return "pl-12";
                        if (index > 1 && index <= 6) return "pl-8";
                        if (index > 6) return "pl-6";
                        return "";
                      };

                      const shouldIndent =
                        (index === 1 || index === 2) && index > 0;

                      return (
                        <div key={index} className="flex items-start">
                          {margins(!left)}
                          {/* <div className="poetry-line flex-1"> */}
                          <div
                            className={`poetry-line flex-1 ${
                              shouldIndent ? getIndentClass() : ""
                            }`}
                          >
                            {!isCeleber ? (
                              <span>
                                {applyDropCap(
                                  preserveElliptics(line),
                                  showLineNumber,
                                  index
                                )}
                              </span>
                            ) : (
                              <span>
                                <span className="tracking-widest">
                                  {applyDropCap(
                                    preserveElliptics(tracked),
                                    showLineNumber,
                                    index
                                  )}
                                </span>
                                <span>{preserveElliptics(untracked)}</span>
                              </span>
                            )}
                            <br />
                          </div>
                          {margins(left)}
                        </div>
                      );
                    };

                    const element = renderedLine();

                    if (line !== "") lineCounter++;
                    lastLineEmpty = line === "";

                    return element;
                  };

                  if (week !== FULL_TEXT) {
                    return edition[week - 1].map((line, index) => {
                      return singleLine(
                        line,
                        index,
                        true,
                        line === cantusSections1855[0][0]
                      );
                    });
                  }

                  if (week === FULL_TEXT) {
                    return edition.map((section, index) => {
                      const sectionNumber = index;
                      const isSmallScreen = window.innerWidth < 768;
                      return section.map((line, index) => {
                        return (
                          <>
                            {index === 0 && (
                              <FadeInTitle>
                                {toRoman(sectionNumber + 1)}
                              </FadeInTitle>
                            )}
                            {singleLine(
                              line,
                              index,
                              isSmallScreen,
                              line === cantusSections1855[0][0]
                            )}
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
