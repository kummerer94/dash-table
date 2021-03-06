import sort, { SortDirection, SortSettings } from 'core/sorting';
import multiUpdateSettings from 'core/sorting/multi';
import singleUpdateSettings from 'core/sorting/single';

describe('sort', () => {
    it('sorts', () => {
        const data = [[1], [3], [4], [2]];
        const sorted = sort(
            data,
            [{ column_id: 0, direction: SortDirection.Descending }]
        );

        expect(sorted.length).to.equal(data.length);
        expect(sorted[0][0]).to.equal(4);
        expect(sorted[1][0]).to.equal(3);
        expect(sorted[2][0]).to.equal(2);
        expect(sorted[3][0]).to.equal(1);
    });

    it('sorts undefined after when descending', () => {
        const data = [[1], [undefined], [3], [undefined], [4], [2], [undefined]];

        const sorted = sort(
            data,
            [{ column_id: 0, direction: SortDirection.Descending }]
        );

        expect(sorted.length).to.equal(data.length);
        expect(sorted[0][0]).to.equal(4);
        expect(sorted[1][0]).to.equal(3);
        expect(sorted[2][0]).to.equal(2);
        expect(sorted[3][0]).to.equal(1);
        expect(sorted[4][0]).to.equal(undefined);
        expect(sorted[5][0]).to.equal(undefined);
        expect(sorted[6][0]).to.equal(undefined);
    });

    it('sorts undefined after when ascending', () => {
        const data = [[1], [undefined], [3], [undefined], [4], [2], [undefined]];

        const sorted = sort(
            data,
            [{ column_id: 0, direction: SortDirection.Ascending }]
        );

        expect(sorted.length).to.equal(data.length);
        expect(sorted[0][0]).to.equal(1);
        expect(sorted[1][0]).to.equal(2);
        expect(sorted[2][0]).to.equal(3);
        expect(sorted[3][0]).to.equal(4);
        expect(sorted[4][0]).to.equal(undefined);
        expect(sorted[5][0]).to.equal(undefined);
        expect(sorted[6][0]).to.equal(undefined);
    });

    it('sorts null after when descending', () => {
        const data = [[1], [null], [3], [null], [4], [2], [null]];

        const sorted = sort(
            data,
            [{ column_id: 0, direction: SortDirection.Descending }]
        );

        expect(sorted.length).to.equal(data.length);
        expect(sorted[0][0]).to.equal(4);
        expect(sorted[1][0]).to.equal(3);
        expect(sorted[2][0]).to.equal(2);
        expect(sorted[3][0]).to.equal(1);
        expect(sorted[4][0]).to.equal(null);
        expect(sorted[5][0]).to.equal(null);
        expect(sorted[6][0]).to.equal(null);
    });

    it('sorts null after when ascending', () => {
        const data = [[1], [null], [3], [null], [4], [2], [null]];

        const sorted = sort(
            data,
            [{ column_id: 0, direction: SortDirection.Ascending }]
        );

        expect(sorted.length).to.equal(data.length);
        expect(sorted[0][0]).to.equal(1);
        expect(sorted[1][0]).to.equal(2);
        expect(sorted[2][0]).to.equal(3);
        expect(sorted[3][0]).to.equal(4);
        expect(sorted[4][0]).to.equal(null);
        expect(sorted[5][0]).to.equal(null);
        expect(sorted[6][0]).to.equal(null);
    });

    it('respects sort order - 1', () => {
        const data = [
            [1, 3],
            [2, 3],
            [0, 0],
            [0, 3],
            [0, 1],
            [2, 1],
            [1, 0],
            [1, 1],
            [2, 0]
        ];

        const sorted = sort(
            data,
            [
                { column_id: 0, direction: SortDirection.Descending },
                { column_id: 1, direction: SortDirection.Descending }
            ]
        );

        expect(sorted.length).to.equal(data.length);
        expect(sorted[0][0]).to.equal(2);
        expect(sorted[0][1]).to.equal(3);
        expect(sorted[1][0]).to.equal(2);
        expect(sorted[1][1]).to.equal(1);
        expect(sorted[2][0]).to.equal(2);
        expect(sorted[2][1]).to.equal(0);
    });

    it('respects sort order - 2', () => {
        const data = [
            [1, 3],
            [2, 3],
            [0, 0],
            [0, 3],
            [0, 1],
            [2, 1],
            [1, 0],
            [1, 1],
            [2, 0]
        ];

        const sorted = sort(
            data,
            [
                { column_id: 1, direction: SortDirection.Descending },
                { column_id: 0, direction: SortDirection.Ascending }
            ]
        );

        expect(sorted.length).to.equal(data.length);
        expect(sorted[0][0]).to.equal(0);
        expect(sorted[0][1]).to.equal(3);
        expect(sorted[1][0]).to.equal(1);
        expect(sorted[1][1]).to.equal(3);
        expect(sorted[2][0]).to.equal(2);
        expect(sorted[2][1]).to.equal(3);
    });
});

describe('sorting settings', () => {
    describe('single column sorting', () => {
        it('new descending', () => {
            const settings = singleUpdateSettings([], { column_id: 0, direction: SortDirection.Descending });

            expect(settings.length).to.equal(1);
            expect(settings[0].column_id).to.equal(0);
            expect(settings[0].direction).to.equal(SortDirection.Descending);
        });

        it('update to descending', () => {
            const settings = singleUpdateSettings(
                [{ column_id: 0, direction: SortDirection.Ascending }],
                { column_id: 0, direction: SortDirection.Descending }
            );

            expect(settings.length).to.equal(1);
            expect(settings[0].column_id).to.equal(0);
            expect(settings[0].direction).to.equal(SortDirection.Descending);
        });

        it('remove by setting to None', () => {
            const settings = singleUpdateSettings(
                [{ column_id: 0, direction: SortDirection.Ascending }],
                { column_id: 0, direction: SortDirection.None }
            );

            expect(settings.length).to.equal(0);
        });

        it('replace with other', () => {
            const settings = singleUpdateSettings(
                [{ column_id: 0, direction: SortDirection.Ascending }],
                { column_id: 1, direction: SortDirection.Ascending }
            );

            expect(settings.length).to.equal(1);
            expect(settings[0].column_id).to.equal(1);
            expect(settings[0].direction).to.equal(SortDirection.Ascending);
        });

        it('replace with None', () => {
            const settings = singleUpdateSettings(
                [{ column_id: 0, direction: SortDirection.Ascending }],
                { column_id: 1, direction: SortDirection.None }
            );

            expect(settings.length).to.equal(0);
        });
    });

    describe('multi columns sorting', () => {
        it('new descending', () => {
            const settings = multiUpdateSettings([], { column_id: 0, direction: SortDirection.Descending });

            expect(settings.length).to.equal(1);
            expect(settings[0].column_id).to.equal(0);
            expect(settings[0].direction).to.equal(SortDirection.Descending);
        });

        it('update to descending', () => {
            const settings = multiUpdateSettings(
                [{ column_id: 0, direction: SortDirection.Ascending }],
                { column_id: 0, direction: SortDirection.Descending }
            );

            expect(settings.length).to.equal(1);
            expect(settings[0].column_id).to.equal(0);
            expect(settings[0].direction).to.equal(SortDirection.Descending);
        });

        it('remove by setting to None', () => {
            const settings = multiUpdateSettings(
                [{ column_id: 0, direction: SortDirection.Ascending }],
                { column_id: 0, direction: SortDirection.None }
            );

            expect(settings.length).to.equal(0);
        });

        it('respects order', () => {
            const settings = multiUpdateSettings(
                [{ column_id: 0, direction: SortDirection.Ascending }],
                { column_id: 1, direction: SortDirection.Ascending }
            );

            expect(settings.length).to.equal(2);
            expect(settings[0].column_id).to.equal(0);
            expect(settings[1].column_id).to.equal(1);
        });

        it('respects order when removed and added back', () => {
            let settings: SortSettings = [{ column_id: 0, direction: SortDirection.Ascending }];

            settings = multiUpdateSettings(
                settings,
                { column_id: 1, direction: SortDirection.Ascending }
            );

            settings = multiUpdateSettings(
                settings,
                { column_id: 0, direction: SortDirection.None }
            );

            settings = multiUpdateSettings(
                settings,
                { column_id: 0, direction: SortDirection.Ascending }
            );

            expect(settings.length).to.equal(2);
            expect(settings[0].column_id).to.equal(1);
            expect(settings[1].column_id).to.equal(0);
        });
    });
});