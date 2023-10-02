const {
    notificationCollection,
    notification
} = require("../../models/index");

const {
    getNotificationById,
    updateNotification
} = require("../../middleware/notification/modleHandle")

jest.mock("../../models/index", () => {
    const originalModule = jest.requireActual("../../models/index");
    return {
        ...originalModule,
        notification: {
            findAll: jest.fn(),
        },
        notificationCollection: {
            update: jest.fn(),
        },
    };
});

describe('Notification Functions', () => {
    it('should get notifications by user ID', async () => {
        const userId = 123;
        const mockNotifications = [
            { id: 1, receiverId: userId, read: false },
            { id: 2, receiverId: userId, read: false },
        ];
        notification.findAll.mockResolvedValue(mockNotifications);

        const result = await getNotificationById(userId);

        expect(result).toEqual(mockNotifications);
    });

    it('should update a notification', async () => {
        const payload = { id: 1, read: true };
        notificationCollection.update.mockResolvedValue();

        const result = await updateNotification(payload);

        expect(result).toBe('Updated successfully');
    });

    it('should handle errors when getting notifications', async () => {
        notification.findAll.mockRejectedValue(new Error('Database error'));

        const userId = 123;
        const result = await getNotificationById(userId);

        expect(result).toEqual(undefined); // or whatever you expect when an error occurs
    });

});


