const levels = [
    {
        width: 10,
        height: 1,
        treasure: 9,
        player_position: 0,
        monsters: [],
        stones: []
    },
    {
        width: 6,
        height: 4,
        treasure: 10,
        player_position: 0,
        monsters: [],
        stones: [1, 2, 3, 5, 6, 7, 9, 11, 15, 19, 23]
    },
    {
        width: 9,
        height: 6,
        treasure: 10,
        player_position: 0,
        monsters: [
            {
                mob: 'zombie', 
                position: 32, 
                current_position: 0, 
                path: [32, 39, 46, 53, 46, 39, 32]
            }, 
            {
                mob: 'zombie', 
                position: 20, 
                current_position: 0, 
                path: [35, 28, 21, 14, 21, 28, 35]
            }
        ],
        stones: [1, 2, 3, 4, 5, 7, 8, 9, 11, 13, 19, 25, 31]
    },
    {
        width: 10,
        height: 5,
        treasure: 47,
        player_position: 2,
        monsters: [
            {
                mob: 'zombie',
                position: 10,
                current_position: 0,
                path: [10, 11, 12, 13, 14, 13, 12, 11, 10]
            },
            {
                mob: 'zombie',
                position: 24,
                current_position: 0,
                path: [24, 23, 22, 21, 20, 21, 22, 23, 24]
            },
            {
                mob: 'zombie',
                position: 32,
                current_position: 0,
                path: [7, 12, 17, 22, 27, 32, 37, 42, 37, 32, 27, 22, 17, 12, 7]
            }
        ],
        stones: [45, 46, 48, 49]
    },
    {
        width: 8,
        height: 8,
        treasure: 21,
        player_position: 2,
        monsters: [
            {
                mob: 'skeleton', 
                position: 56,
                arrows: [],
                arraw_path: [] 
            }, 
            {
                mob: 'zombie', 
                position: 32, 
                current_position: 0, 
                path: [35, 43, 51, 43, 35]
            }, 
        ],
        stones: [3, 10, 11, 17, 18, 19, 25, 26, 27, 31, 38, 39, 45, 46, 47, 52, 53, 54, 55, 59, 60, 61, 62, 63]
    },
    {
        width: 12,
        height: 9,
        treasure: 69,
        monsters: [],
        stones: []
    },
    {
        width: 14,
        height: 10,
        treasure: 51,
        monsters: [],
        stones: []
    },
    {
        width: 16,
        height: 10,
        treasure: 13,
        monsters: [],
        stones: []
    },
    {
        width: 20,
        height: 10,
        treasure: 52,
        monsters: [],
        stones: []
    }
]