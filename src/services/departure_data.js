module.exports = {
  status: 0,
  message: 'success',
  response: {
    approach_info: {
      approach_ids: [
        "00138",
        "00141",
        "00150",
        "00165",
        "00182",
        "00195",
        "00201"
      ],
      plan_type: 2,
      select: {
        from: [
          { code: '2590', name: '東京' },
          { code: '2236', name: '品川' }
        ],
        to: [
          { code: '5198', name: '京都' },
          { code: '5429', name: '新大阪' }
        ],
      }
    },
    togo: {
      approach_info: {
        approach_ids: [],
        plan_type: 2,
        date: 20170526
      },
      sections: [{
        section_index: '0',
        from: {
          code: '2590',
          name: '東京'
        },
        to: {
          code: '5429',
          name: '新大阪'
        },
        kind_list: [],
        seat_list: [],
        train_list: [],
      }]
    },
    back: {}
  }
};
