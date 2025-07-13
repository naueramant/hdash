import { Button, Card, Stack, Typography, useTheme } from "@mui/joy";
import { useEffect, useMemo, useState, type FunctionComponent } from "react";
import type { Weight } from "../../models/weights";

const Overview: FunctionComponent = () => {
  const navigate = useNavigate();
  const userStore = useUserStore();

  const [weights, setWeights] = useState<Weight[]>([]);
  const [allTimeOldestWeight, setAllTimeOldestWeight] =
    useState<Weight | null>();

  const newestWeight = weights[weights.length - 1];
  const oldestWeight = weights[0];

  const bmiResult = calculateBMI(
    getUserAge(userStore.user?.birthday ?? ""),
    newestWeight?.weight ?? 0,
    userStore.user?.height ?? 0
  );

  const bodyFatEstimate = estimateBodyFatFromBMI({
    gender: userStore.user?.gender ?? "male",
    age: getUserAge(userStore.user?.birthday ?? ""),
    heightCm: userStore.user?.height ?? 0,
    weightKg: newestWeight?.weight ?? 0,
  });

  const thirtyDaysDelta = newestWeight?.weight - oldestWeight?.weight || 0;
  const allTimeDelta =
    newestWeight?.weight - (allTimeOldestWeight?.weight || 0) || 0;

  useEffect(() => {
    if (!userStore.user) return;

    getThirtyDaysWeights(userStore.user.name).then((fetchedWeights) => {
      setWeights(fetchedWeights);
    });
    getAllTimeOldestWeight(userStore.user.name).then((oldestWeight) => {
      setAllTimeOldestWeight(oldestWeight);
    });
  }, [userStore.user]);

  const chartData = useMemo(() => {
    if (weights.length === 0) return [];

    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const data = [];
    let lastKnownWeight = weights[0]?.weight || 0;

    for (
      let d = new Date(thirtyDaysAgo);
      d <= today;
      d.setDate(d.getDate() + 1)
    ) {
      const dateStr = d.toISOString().split("T")[0];
      const weightEntry = weights.find(
        (w) => new Date(w.created).toISOString().split("T")[0] === dateStr
      );

      if (weightEntry) {
        lastKnownWeight = weightEntry.weight;
        data.push({
          created: d.getTime(),
          weight: weightEntry.weight,
          isReported: true,
        });
      } else {
        data.push({
          created: d.getTime(),
          weight: lastKnownWeight,
          isReported: false,
        });
      }
    }

    return data;
  }, [weights]);

  const t = useTheme();

  return (
    <Stack
      sx={{
        flex: 1,
        padding: 2,
      }}
      gap={2}
    >
      <TopBar
        onExit={() => {
          userStore.reset();
        }}
      />

      <Stack
        direction="row"
        gap={2}
        sx={{
          with: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <StatCard
          title="Weight"
          value={`${newestWeight?.weight.toFixed(2) ?? "0.0"} kg`}
        />
        <StatCard title="BMI" value={bmiResult?.bmi.toFixed(2) ?? "?"} />
        <StatCard
          title="Body Fat"
          value={`${bodyFatEstimate?.bodyFatPercentage.toFixed(2)}%`}
        />
        <StatCard
          title="30 days change"
          value={`${thirtyDaysDelta.toFixed(2)} kg`}
        />
        <StatCard
          title="Total Change"
          value={`${allTimeDelta.toFixed(2)} kg`}
        />
      </Stack>

      <Card
        sx={{
          flex: 1,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis
              dataKey="created"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 14 }}
              tickFormatter={(timestamp) => {
                const date = new Date(timestamp);
                return `${date.getDate()}/${date.getMonth() + 1}`;
              }}
            />
            <Bar
              dataKey="weight"
              radius={[4, 4, 4, 4]}
              label={{
                position: "center",
                fill: t.palette.primary[900],
                fontSize: 12,
                formatter: (value: number) => `${value.toFixed(2)} kg`,
              }}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.isReported
                      ? t.palette.primary[100]
                      : t.palette.warning[300]
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Stack direction="row" gap={2}>
        <Button
          fullWidth
          sx={{
            fontSize: 32,
          }}
          onClick={() => {
            navigate("/submit-weight");
          }}
        >
          Record Weight
        </Button>
      </Stack>
    </Stack>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
}

const StatCard: FunctionComponent<StatCardProps> = (props) => {
  return (
    <Card
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Stack>
        <Typography fontSize={18} fontWeight={500} textAlign="center">
          {props.title}
        </Typography>
        <Typography fontSize={32} fontWeight={700} textAlign="center">
          {props.value}
        </Typography>
      </Stack>
    </Card>
  );
};

import { useNavigate } from "react-router";
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis } from "recharts";
import { getAllTimeOldestWeight, getThirtyDaysWeights } from "../../api/weight";
import TopBar from "../../components/TopBar";
import { getUserAge } from "../../models/user";
import useUserStore from "../../stores/user";
import { calculateBMI, estimateBodyFatFromBMI } from "../../utilities/health";

export default Overview;
