"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface TrainArrival {
  id: number;
  line: "1" | "2" | "3";
  destination: string;
  seconds: number;
}

// South Ferry is only served by the 1 train
const destinations1 = {
  downtown: ["South Ferry", "34 St-Penn Station", "14 St"],
  uptown: ["Van Cortlandt Park-242 St", "238 St", "137 St"],
};

// 2 and 3 trains don't go to South Ferry
const destinations23 = {
  downtown: ["Flatbush Av–Brooklyn College", "New Lots Av", "14 St"],
  uptown: ["241 St", "148 St", "135 St"],
};

function MTACountdownContent() {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme");
  const [arrivals, setArrivals] = useState<TrainArrival[]>([]);
  const [direction] = useState<"downtown" | "uptown">("downtown");
  const nextId = useRef(0);

  const generateSingleArrival = useCallback((existingSeconds: number[]): TrainArrival => {
    const lines: ("1" | "2" | "3")[] = ["1", "2", "3"];
    const line = lines[Math.floor(Math.random() * lines.length)];

    // Pick destination based on line (South Ferry only for 1 train)
    const dests = line === "1" ? destinations1[direction] : destinations23[direction];
    const destination = dests[Math.floor(Math.random() * dests.length)];

    // Generate minutes that don't conflict with existing trains
    let minutes = Math.floor(Math.random() * 7) + 2; // 2-8 minutes
    let attempts = 0;
    while (existingSeconds.some(s => Math.abs(Math.ceil(s / 10) - minutes) < 1) && attempts < 10) {
      minutes = Math.floor(Math.random() * 7) + 2;
      attempts++;
    }

    return {
      id: nextId.current++,
      line,
      destination,
      seconds: minutes * 10,
    };
  }, [direction]);

  useEffect(() => {
    if (theme !== "nyc") return;

    // Initial arrivals - generate 2
    const initial: TrainArrival[] = [];
    initial.push(generateSingleArrival([]));
    initial.push(generateSingleArrival([initial[0].seconds]));
    initial.sort((a, b) => a.seconds - b.seconds);
    setArrivals(initial);

    // Countdown every second
    const countdownInterval = setInterval(() => {
      setArrivals((prev) => {
        // Decrement all by 1 second
        let updated = prev.map((a) => ({ ...a, seconds: a.seconds - 1 }));

        // Remove trains that have departed (shown NOW for 3 seconds)
        const departed = updated.filter((a) => a.seconds < -3);
        updated = updated.filter((a) => a.seconds >= -3);

        // If a train departed, add a new one
        if (departed.length > 0 && updated.length < 2) {
          const existingSeconds = updated.map(a => a.seconds);
          const newTrain = generateSingleArrival(existingSeconds);
          updated.push(newTrain);
        }

        // Sort by arrival time
        updated.sort((a, b) => a.seconds - b.seconds);

        return updated;
      });
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [theme, generateSingleArrival]);

  if (theme !== "nyc") return null;

  const getLineColor = () => "#EE352E"; // All 1, 2, 3 trains are red

  const directionLabel = "Downtown & Brooklyn";

  // Convert seconds to display minutes
  const getDisplayMinutes = (seconds: number) => Math.ceil(seconds / 10);

  return (
    <div className="mta-countdown-wrapper">
      {/* Hanging wires */}
      <div className="mta-countdown-wires">
        <div className="wire" />
        <div className="wire" />
      </div>
      {/* Display panel */}
      <div className="mta-countdown-display">
        <div className="mta-countdown-header">
          <span className="direction">{directionLabel}</span>
        </div>
        <div className="mta-countdown-arrivals">
          {arrivals.filter(a => a.seconds >= -2).map((arrival) => (
            <div key={arrival.id} className="arrival-row">
              <div
                className="line-bullet"
                style={{ backgroundColor: getLineColor() }}
              >
                {arrival.line}
              </div>
              <div className="destination">{arrival.destination}</div>
              <div className="time">
                {arrival.seconds <= 0 ? (
                  <span className="arriving">NOW</span>
                ) : (
                  <>
                    <span className="minutes">{getDisplayMinutes(arrival.seconds)}</span>
                    <span className="min-label">min</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MTACountdown() {
  return (
    <Suspense fallback={null}>
      <MTACountdownContent />
    </Suspense>
  );
}
