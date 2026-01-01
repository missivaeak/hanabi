import { writable } from "svelte/store";
import type { CardKnowledge } from "../model/CardModel.svelte";

const knowledgeStore = writable<CardKnowledge[]>([]);

export default knowledgeStore;
