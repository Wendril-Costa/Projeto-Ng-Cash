import { INTEGER, Model, STRING } from 'sequelize'
import db from '.'
import Account from './account'

class User extends Model {
  readonly id!: number
  public username!: string
  public password!: string
  public accountId!: {
    id: number
  }
}

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: STRING,
    allowNull: false
  },
  password: {
    type: STRING
  },
  accountId: {
    type: INTEGER,
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false
})

User.belongsTo(Account, { foreignKey: 'accountId' })

export default User
