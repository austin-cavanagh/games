import startAndEndPage from './startAndEndPage';

describe('startAndEndPage', () => {
  it('handles early pages correctly', () => {
    expect(startAndEndPage(1, 10)).toEqual({ startPage: 1, endPage: 5 });
    expect(startAndEndPage(3, 10)).toEqual({ startPage: 1, endPage: 5 });
  });

  it('handles middle pages correctly', () => {
    expect(startAndEndPage(4, 10)).toEqual({ startPage: 2, endPage: 6 });
    expect(startAndEndPage(6, 10)).toEqual({ startPage: 4, endPage: 8 });
  });

  it('handles late pages correctly', () => {
    expect(startAndEndPage(8, 10)).toEqual({ startPage: 6, endPage: 10 });
    expect(startAndEndPage(10, 10)).toEqual({ startPage: 6, endPage: 10 });
  });

  it('handles cases with fewer than 5 total pages', () => {
    expect(startAndEndPage(1, 4)).toEqual({ startPage: 1, endPage: 4 });
    expect(startAndEndPage(1, 1)).toEqual({ startPage: 1, endPage: 1 });
  });

  it('handles edge cases at the boundaries of page ranges', () => {
    expect(startAndEndPage(4, 5)).toEqual({ startPage: 1, endPage: 5 });
    expect(startAndEndPage(2, 5)).toEqual({ startPage: 1, endPage: 5 });
  });
});
