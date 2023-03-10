import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  getRooms: async (count: number, page: number): Promise<any> => {
    const skip = count * (page - 1);
    const take = count;
    try {
      const rooms = await prisma.pokerRooms.findMany({
        orderBy: {
          updated_at: 'desc',
        },
        skip,
        take,
      });

      return rooms;
    } catch (error) {
      throw new Error('Error getting rooms');
    }
  },
  getRoom: async (roomId: number): Promise<any> => {
    try {
      const room = await prisma.pokerRooms.findUnique({ where: { roomId } });
      return room;
    } catch (error) {
      throw new Error('Error getting room');
    }
  },
  initializeRoom: async (
    ownerId: number,
    roomName: string,
    roomType: string,
    playerCount: number,
    smallBlind: number,
    bigBlind: number
  ): Promise<any> => {
    try {
      const room = await prisma.pokerRooms.create({
        data: {
          ownerId,
          playerCount,
          roomName,
          roomType,
          smallBlind,
          bigBlind,
          currentPlayerCount: 1,
        },
      });
      return room;
    } catch (error) {
      throw new Error(error);
    }
  },
  updateRoom: async (roomId: number, params: any): Promise<any> => {
    try {
      const updatedRoom = await prisma.pokerRooms.update({
        where: { roomId },
        data: { ...params },
      });
      return updatedRoom;
    } catch (error) {
      throw new Error(error);
    }
  },

  deleteRoom: async (roomId: number): Promise<any> => {
    return await prisma.pokerRooms.delete({
      where: { roomId },
    });
  },
  getSeating: async (roomId: number): Promise<any> => {
    return await prisma.roomPlayers.findUnique({
      where: { roomId },
      select: {
        player1: true,
        player2: true,
        player3: true,
        player4: true,
        player5: true,
        player6: true,
        player7: true,
        player8: true,
        player9: true,
      },
    });
  },
  assignSeating: async (
    roomId: number,
    playerId: number,
    position: string
  ): Promise<any> => {
    try {
      const roomPlayer = await prisma.roomPlayers.create({
        data: {
          roomId,
          [position]: playerId,
        },
      });
      return roomPlayer;
    } catch (error) {
      throw new Error(error);
    }
  },
  joinOrLeaveRoom: async (
    roomId: number,
    playerId: number,
    position: number
  ): Promise<any> => {
    const player = `player${position}`;
    try {
      const updatedSeating = await prisma.roomPlayers.update({
        where: { roomId },
        data: {
          [player]: playerId,
        },
      });
      return updatedSeating;
    } catch (error) {
      throw new Error(error);
    }
  },

  deleteRoomPlayers: async (roomId: number): Promise<any> => {
    try {
      const deleted = await prisma.roomPlayers.delete({
        where: { roomId },
      });
      return deleted;
    } catch (error) {
      throw new Error(error);
    }
  },
};
