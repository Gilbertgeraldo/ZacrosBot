cmd.on('eval',['>','=>'],['owner'],async(msg,res) => {
let parse = res.command.includes('=>') ? res.text.replace('=>','return ') : res.text.replace('>','')
try{
let evaluate = await eval(`;(async () => {${parse} })()`).catch(e => { return e });
return client.reply(msg,functions.util.format(evaluate), {quoted : msg, contextInfo: { externalAdReply: { title: botinfo.botname, "body": 'Multipurpose Whatsapp bot using baileys library!', thumbnailUrl:botinfo.thumb, sourceUrl: 'https://github.com/Zacros-Team/ZacrosBot/'}}});
} catch(e){
return res.client.reply(msg,functions.util.format(e), {quoted : msg, contextInfo: { externalAdReply: { title: botinfo.botname, "body": 'Multipurpose Whatsapp bot using baileys library!', thumbnailUrl:botinfo.thumb, sourceUrl: 'https://github.com/Zacros-Team/ZacrosBot/'}}});
}
},{owner:'--noresp',usedPrefix:false});

cmd.on('exec',['$'],['owner'],async(msg,res) => {
try{
functions.exec(`${res.query}`,(err,out) => {
if (err) return client.reply(msg,functions.util.format(err), {quoted : msg, contextInfo: { externalAdReply: { title: botinfo.botname, "body": 'Multipurpose Whatsapp bot using baileys library!', thumbnailUrl:botinfo.thumb, sourceUrl: 'https://github.com/Zacros-Team/ZacrosBot/'}}});
client.reply(msg,functions.util.format(out), {quoted : msg, contextInfo: { externalAdReply: { title: botinfo.botname, "body": 'Multipurpose Whatsapp bot using baileys library!', thumbnailUrl:botinfo.thumb, sourceUrl: 'https://github.com/Zacros-Team/ZacrosBot/'}}});
});
} catch(e){
 return res.client.reply(msg,functions.util.format(e), {quoted : msg, contextInfo: { externalAdReply: { title: botinfo.botname, "body": 'Multipurpose Whatsapp bot using baileys library!', thumbnailUrl:botinfo.thumb, sourceUrl: 'https://github.com/Zacros-Team/ZacrosBot/'}}});
}
},{owner:'--noresp',usedPrefix:false})

cmd.on('bc',['broadcast'],['owner'],(msg,{query,client}) => {
let sender = msg.sender.vname
let anu = client.chats.all()
for (let _ of anu) {
client.sendText(_.jid, `${botinfo.botname} Broadcast\n\n${query}\n\nBroadcast message sender : ${sender}`)}
},{owner:'Only owner',query:'Isi query!'});

cmd.on('bcgc',['bcgc'],['owner'],(msg,{query,client}) => {
let sender = msg.sender.vname
let anu = client.chats.all().filter(v => v.jid.endsWith('g.us') && !v.read_only && v.message && !v.announce).map(v => v.jid)
for (let _ of anu) {
client.sendText(_, `${botinfo.botname} Broadcast\n\n${query}\n\nBroadcast message sender : ${sender}`)}
},{owner:'Only owner',query:'Isi query!'});

cmd.on('bcbutt',['bcbutton'],['owner'],(msg,{query,client}) => {
let sender = msg.sender.vname
let anu = client.chats.all()
for (let _ of anu) {
client.sendButton(_.jid,Buffer.alloc(0),'documentMessage',[{id:'.menu',text:'MENU'},{id:'.info',text:'INFO'}],{mimetype:'application/octet-stream',filename:botinfo.botname+' Broadcast',content:`${query}\n\n_Broadcast message sender : ${sender}_`,footer:botinfo.footerText,contextInfo:{ externalAdReply: { title: botinfo.botName, "body": `Multipurpose Whatsapp bot using library baileys!`,thumbnailUrl: botinfo.thumb,sourceUrl: 'wa.me/+6283153448697'}}})
}
},{owner:'Only owner',query:'Isi query!',param: functions.needed('teks')});

cmd.on('clear',['clearall'],['owner'],(msg,{query,client}) => {
 for ( let am of client.chats.all()) client.modifyChat(am.jid,'delete')
 return client.sendText(msg.from, "Ok")
},{owner:true})

cmd.on('tampilanbot',['setui'],['owner'],async(msg,{query,client}) => {
	qq = query.split("|");
	switch(qq[0]){
	case "name": {
		await client.updateProfileName(qq[1]);
		return client.reply(msg, `Sukses Mengganti Nama WhatsApp Bot : ${qq[1]}`);
		}
		break
	case "bio": {
		await client.setStatus(qq[1]);
		return client.reply(msg, `Sukses Mengganti Bio WhatsApp Bot : ${qq[1]}`);
		}
		break
	case "prefix": {
	    botinfo.prefix = qq[1];
	    return client.reply(msg, `Sukses Mengganti Prefix Bot : ${qq[1]}`);
		}
		break
	case "botname":{
	    botinfo.botname = qq[1];
	    return client.reply(msg, `Sukses Mengganti Nama Bot : ${qq[1]}`);
		}
		break
	case "ownername":{
		botinfo.ownername = qq[1];
		return client.reply(msg, `Sukses Mengganti Nama Owner Bot : ${qq[1]}`);
		}
		break
	case "footertext": {
		botinfo.footerText = qq[1];
		return client.reply(msg, `Sukses Mengganti Default Footer Button : ${qq[1]}`);
		}
		break
    }
	if (!qq[0] && !qq[1]) {
		return client.reply(msg, "Masukkan Query & Code!\n\nList Query :\n- name\n- bio\n- prefix\n- botname\n- ownername\n- footertext\n\nContoh Penggunaan :\n.setui prefix !");
		}
		},{owner:true,param:functions.needed("type  code")});
		
		cmd.on("blocklist", ["blocklist"], ["owner"], (req, res) => {
			try {
			  let blocklist = client.blocklist;
			  let txt = "";
			  let num = 1;
			  let blockList = [];
			  txt += "Jumlah: " + blocklist.length + "\n";
			  for (let i of blocklist) {
				txt += "Urutan: " + num++ + "\n";
				txt += "Nomor: @" + i.split("@")[0] + "\n";
				txt += "Wame: wa.me/" + i.split("@")[0] + "\n\n";
				blockList.push(i.replace("@c.us", "@s.whatsapp.net"));
			  }
			  client.reply(req, txt, {
				contextInfo: {
				  mentionedJid: blockList
				}
			  });
			} catch (err) {
			  console.log(err);
			  client.reply(req, "Terjadi kesalahan");
			}
		  }, {
			owner: true,
		  });
