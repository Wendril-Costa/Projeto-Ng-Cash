import { INTEGER, Model, DECIMAL, NOW, DATEONLY } from 'sequelize'
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
  transactions: any
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
    type: DATEONLY,
    allowNull: false,
    defaultValue: NOW
  }
}, {
  sequelize: db,
  modelName: 'transactions',
  timestamps: false
})

Transaction.belongsTo(Account, { foreignKey: 'debitedAccountId' })
Transaction.belongsTo(Account, { foreignKey: 'creditedAccountId' })

export default Transaction
