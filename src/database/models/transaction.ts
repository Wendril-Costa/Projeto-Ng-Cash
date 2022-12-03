import { INTEGER, Model, DECIMAL, DATE, NOW } from 'sequelize'
import db from '.'
import Account from './account'

class Transaction extends Model {
  readonly id!: number
  public debitedAccountId!: {
    id: number
  }

  public creditedAccountId!: {
    id: number
  }

  public value!: number
  public createdAt!: number
}

Transaction.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  debitedAccountId: {
    type: INTEGER,
    allowNull: false
  },
  creditedAccountId: {
    type: INTEGER
  },
  value: {
    type: DECIMAL,
    allowNull: false
  },
  createdAt: {
    type: DATE,
    allowNull: false,
    defaultValue: NOW
  }
}, {
  sequelize: db,
  modelName: 'transactions',
  timestamps: false
})

Transaction.belongsTo(Account, { foreignKey: 'debitedAccount' })
Transaction.belongsTo(Account, { foreignKey: 'creditedAccount' })

export default Transaction
