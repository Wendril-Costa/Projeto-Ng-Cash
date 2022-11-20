import { INTEGER, Model, DECIMAL } from 'sequelize'
import db from '.'

class Account extends Model {
  readonly id!: number
  public balance!: number
}

Account.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  balance: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 100.0
  }
}, {
  sequelize: db,
  modelName: 'accounts',
  timestamps: false
})

export default Account
