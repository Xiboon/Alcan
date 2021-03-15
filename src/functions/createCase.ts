import AlcanClient from "../classes/client"
import { Guild, User } from "discord.js"
module.exports = async function (client: AlcanClient, guild: Guild, user: User, creator: User, type: string, dscp: string): Promise<object> {
    let values = await client.db.table("Case").filter({ id: guild.id }).orderBy(client.db.desc("nr")).filter(1).run(client.conn)
    let nr1;
    
      if (values[0] && values[0].nr) nr1 = values[0].nr
      else nr1 = "1"
  
      return {nr: nr1, id: guild.id, user: user, creator: creator, type: type, dscp: dscp};
  }