const Collection = require('../../models/data-collections');

const UserModelMock = {
    findOne: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
};

describe('Collection class', () => {
    let collection;

    beforeEach(() => {
        collection = new Collection(UserModelMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('get correct data when id is exists', async () => {
        const mockUser = { id: 1, name: 'hamza' };
        UserModelMock.findOne.mockResolvedValue(mockUser);

        const result = await collection.get(1);

        expect(result).toEqual(mockUser);
        expect(UserModelMock.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    test('get all data when id is not exists', async () => {
        const mockUsers = [{ id: 1, name: 'hamza' }, { id: 2, name: 'ihab' }];
        UserModelMock.findAll.mockResolvedValue(mockUsers);

        const result = await collection.get();

        expect(result).toEqual(mockUsers);
        expect(UserModelMock.findAll).toHaveBeenCalled();
    });

    test('getManyRelationWithReplies returns data with likes', async () => {

        const mockModel1 = { id: 1, name: 'Model1' };
        const mockModel2 = { id: 2, name: 'Model2' };
        const mockLikes = [{ id: 1, userId: 1 }, { id: 2, userId: 2 }];

        UserModelMock.findAll.mockResolvedValue([{ id: 1, model1: [mockModel1], Likes: mockLikes }]);

        const result = await collection.getManyRelationWithReplies(mockModel1, mockModel2, mockLikes);

        expect(result).toHaveLength(1);
        expect(result[0]).toHaveProperty('Likes', mockLikes);
        expect(UserModelMock.findAll).toHaveBeenCalled();
    });

    test('followers method returns correct followers data', async () => {
        const mockUser = { id: 1, Followers: [{ id: 2, username: 'follower1' }, { id: 3, username: 'follower2' }] };
        UserModelMock.findAll.mockResolvedValue([mockUser]);

        const result = await collection.followers(1, 'FollowerModel');

        expect(result).toHaveProperty('followers');
        expect(result.followers).toHaveLength(2);
        expect(UserModelMock.findAll).toHaveBeenCalled();
    });

    test('following method returns correct following data and count', async () => {
        const mockUser = { id: 1, Following: [{ id: 2, username: 'following1' }, { id: 3, username: 'following2' }] };
        UserModelMock.findAll.mockResolvedValue([mockUser]);

        const result = await collection.following(1, 'FollowingModel');

        expect(result).toHaveProperty('Following');
        expect(result).toHaveProperty('Count', 2);
        expect(result.Following).toHaveLength(2);
        expect(UserModelMock.findAll).toHaveBeenCalled();
    });

    test('Feeds method returns user posts', async () => {
        const mockUser = { id: 1, Following: [{ id: 2, username: 'following1', img: 'img1' }] };
        const mockPost = { id: 1, content: 'Post content' };

        UserModelMock.findOne.mockResolvedValue(mockUser);
        UserModelMock.findOne.mockResolvedValue(mockUser);

        const PostModelMock = {
            findOne: jest.fn().mockResolvedValue(mockPost),
        };

        const result = await collection.Feeds(1, PostModelMock);

        expect(result).toHaveLength(1);
        expect(result[0]).toHaveProperty('id', 2);
        expect(result[0]).toHaveProperty('name', 'following1');
        expect(result[0]).toHaveProperty('profile', 'img1');
        expect(result[0]).toHaveProperty('userPost', mockPost);
        expect(PostModelMock.findOne).toHaveBeenCalledWith({ where: { userid: 2 } });
    });


});
