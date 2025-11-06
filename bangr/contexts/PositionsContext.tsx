"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Position {
  id: string;
  marketId: number;
  username: string;
  displayName: string;
  outcome: "YES" | "NO";
  shares: number;
  invested: number;
  avgPrice: number;
  purchaseTime: number;
  marketTitle: string;
  currentPrice: number; // We'll update this in real-time
  color: string;
}

interface PositionsContextType {
  positions: Position[];
  addPosition: (position: Omit<Position, "id" | "purchaseTime">) => void;
  updatePosition: (id: string, updates: Partial<Position>) => void;
  removePosition: (id: string) => void;
  getPositionsByMarket: (marketId: number) => Position[];
  getTotalInvested: () => number;
  getTotalValue: () => number;
  getTotalProfitLoss: () => number;
}

const PositionsContext = createContext<PositionsContextType | undefined>(undefined);

export function PositionsProvider({ children }: { children: ReactNode }) {
  const [positions, setPositions] = useState<Position[]>([]);

  const addPosition = (position: Omit<Position, "id" | "purchaseTime">) => {
    const newPosition: Position = {
      ...position,
      id: `pos_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      purchaseTime: Date.now(),
    };
    setPositions((prev) => [...prev, newPosition]);
  };

  const updatePosition = (id: string, updates: Partial<Position>) => {
    setPositions((prev) =>
      prev.map((pos) => (pos.id === id ? { ...pos, ...updates } : pos))
    );
  };

  const removePosition = (id: string) => {
    setPositions((prev) => prev.filter((pos) => pos.id !== id));
  };

  const getPositionsByMarket = (marketId: number) => {
    return positions.filter((pos) => pos.marketId === marketId);
  };

  const getTotalInvested = () => {
    return positions.reduce((sum, pos) => sum + pos.invested, 0);
  };

  const getTotalValue = () => {
    return positions.reduce((sum, pos) => {
      // Calculate current value based on current price
      const currentValue = (pos.shares * pos.currentPrice) / 100;
      return sum + currentValue;
    }, 0);
  };

  const getTotalProfitLoss = () => {
    return getTotalValue() - getTotalInvested();
  };

  return (
    <PositionsContext.Provider
      value={{
        positions,
        addPosition,
        updatePosition,
        removePosition,
        getPositionsByMarket,
        getTotalInvested,
        getTotalValue,
        getTotalProfitLoss,
      }}
    >
      {children}
    </PositionsContext.Provider>
  );
}

export function usePositions() {
  const context = useContext(PositionsContext);
  if (!context) {
    throw new Error("usePositions must be used within a PositionsProvider");
  }
  return context;
}
