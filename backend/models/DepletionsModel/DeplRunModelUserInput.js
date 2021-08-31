module.exports = (sequelize, DataTypes) => {
  const { BOOLEAN, DATE, TEXT, INTEGER } = DataTypes;
  const RunModelUserInput = sequelize.define(
    '_user_input_run_depletions_dirty_flag_test',
    {
      auth0_user_id: {
        type: TEXT,
        primaryKey: true,
      },
      run_pumping_flag: {
        type: BOOLEAN,
      },
      last_run_timestamp: {
        type: DATE,
      },
      year_to_run: {
        type: INTEGER,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
      schema: 'web',
      freezeTableName: true,
    }
  );
  return RunModelUserInput;
};
