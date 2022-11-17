import { INTEGER, Model, DECIMAL, DATE, NOW } from 'sequelize'
import db from '.'
import Account from './account'

class Transaction extends Model {
  id!: number
  value!: number
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

Transaction.belongsTo(Account, { foreignKey: 'debitedAccount', as: 'accounts' })
Transaction.belongsTo(Account, { foreignKey: 'creditedAccount', as: 'accounts' })

export default Transaction
