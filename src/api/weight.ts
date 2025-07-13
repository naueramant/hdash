import PocketBase, { type RecordModel } from "pocketbase";
import type { Weight } from "../models/weights";

const pb = new PocketBase("http://192.168.0.177:8080");

function recordToWeight(record: RecordModel): Weight {
  return {
    id: record.id,
    user: record.user,
    weight: record.weight,
    created: record.created,
    updated: record.updated,
  };
}

export function addUserWeight(
  user: string,
  weight: number,
  date: Date = new Date()
) {
  return pb.collection("weights").create({
    user,
    weight,
    created: date.toISOString(),
  });
}

export function getThirtyDaysWeights(user: string): Promise<Weight[]> {
  return pb
    .collection("weights")
    .getList(1, 30, {
      filter: `user = "${user}"`,
      sort: "-created",
    })
    .then((res) => res.items.map(recordToWeight))
    .then((res) => res.reverse());
}

export function getAllTimeOldestWeight(user: string): Promise<Weight | null> {
  return pb
    .collection("weights")
    .getFirstListItem(`user = "${user}"`, {
      sort: "+created",
    })
    .then((record) => recordToWeight(record))
    .catch(() => null);
}
