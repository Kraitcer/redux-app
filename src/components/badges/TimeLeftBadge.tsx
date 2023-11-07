import { Badge, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { GiSandsOfTime } from "../../utilities/icons";
import { DateTime } from "luxon";
import { Tasks } from "../../pages/Tasks";

interface TimeLeftBadgeProps {
  task: Tasks;
}

const TimeLeftBadge = ({ task }: TimeLeftBadgeProps) => {
  const [today, setToday] = useState<DateTime>(DateTime.now());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setToday(DateTime.now());
    }, 1000 * 24);

    return () => clearInterval(intervalId);
  }, [task]);

  const dueDate = task.dueDate ? DateTime.fromISO(task.dueDate) : "";
  // const today = DateTime.now();
  // console.log(today);
  const timeLeft = dueDate && dueDate?.diff(today, "days").as("days");
  const roundedTimeLeft = Math.floor(timeLeft ? timeLeft + 1 : NaN);
  // console.log(timeLeft);
  let timeLeftBadge = "";
  if (roundedTimeLeft === 0) {
    timeLeftBadge = `Today`;
  } else if (roundedTimeLeft === 1) {
    timeLeftBadge = `${roundedTimeLeft} Day`;
  } else if (typeof roundedTimeLeft === "number" && roundedTimeLeft > 1) {
    timeLeftBadge = `${roundedTimeLeft} Days`;
  }
  // else if (dueDate && dueDate < today) {
  //   timeLeftBadge = "depricated";
  // }
  return (
    <Flex alignItems={"center"} gap={1}>
      {timeLeftBadge && <GiSandsOfTime />}
      <Badge>{timeLeftBadge}</Badge>
    </Flex>
  );
};

export default TimeLeftBadge;
