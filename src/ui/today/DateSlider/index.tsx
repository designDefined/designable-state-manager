import { Button } from "@component/Button";
import { Div, H1, H4 } from "@flexive/core";
import { useSelectedDateStore } from "@store/SelectedDateStore";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useDateSliderDisplay } from "./useDateSliderDisplay";

export const DateSlider = () => {
  const { selectedDate, isToday, toNextDay, toPrevDay } = useSelectedDateStore();
  const display = useDateSliderDisplay(selectedDate);

  return (
    <Div className="text-7" row alignC="baseline" g={16}>
      {!isToday && (
        <Button onClick={toPrevDay} alignSelfC>
          <ChevronsLeft className="text-4" size="2.4rem" />
        </Button>
      )}
      <H4 className="light">
        {display.year}. {display.month}.
      </H4>
      <H1>{display.date}.</H1>
      <Button onClick={toNextDay} alignSelfC>
        <ChevronsRight className="text-4" size="2.4rem" />
      </Button>
    </Div>
  );
};
