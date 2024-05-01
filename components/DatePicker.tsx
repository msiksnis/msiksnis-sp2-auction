import { useRef, useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";

import useOutsideClick from "@/hooks/useOutsideClick";
import { Button } from "./Button";
import Input from "./Input";

type DayPickerComponentProps = {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
};

export default function DayPickerComponent({
  date,
  setDate,
}: DayPickerComponentProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState<string>("00:00");
  const datePickerRef = useRef(null);

  useOutsideClick({
    ref: datePickerRef,
    callback: () => setShowDatePicker(false),
  });

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    const [hours, minutes] = newTime.split(":").map(Number);
    if (date) {
      const updatedDate = new Date(date.setHours(hours, minutes));
      setDate(new Date(updatedDate));
    }
    setTime(newTime);
  };

  const handleDayClick = (day: Date) => {
    const [hours, minutes] = time.split(":").map(Number);
    const newDate = new Date(day.setHours(hours, minutes));
    setDate(new Date(newDate));
  };

  const css = `
    .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
      background-color: black !important;
      border-radius: 5px;
      color: #fff;
    }
  `;

  return (
    <div className="relative">
      <Input
        type="text"
        name="date"
        placeholder="Ends at"
        aria-label="Date"
        onFocus={() => setShowDatePicker(true)}
        value={date ? format(date, "yyyy-MM-dd HH:mm") : ""}
        readOnly
        className="cursor-pointer"
      />
      {showDatePicker && (
        <div
          ref={datePickerRef}
          className="absolute z-10 left-0 mt-1 bg-white border border-slate-900 rounded-md"
        >
          <style>{css}</style>
          <DayPicker
            selected={date}
            fromDate={new Date()}
            showOutsideDays
            weekStartsOn={1}
            onDayClick={handleDayClick}
            modifiersClassNames={
              date ? { selected: "DayPicker-Day--selected" } : {}
            }
          />
          <div className="flex items-center justify-between m-2">
            <Input
              type="time"
              value={time}
              onChange={handleTimeChange}
              className="h-8"
            />
            <Button size="sm" onClick={() => setShowDatePicker(false)}>
              Select
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
