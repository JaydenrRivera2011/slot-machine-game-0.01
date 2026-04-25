/* ============================================================
   LUCKY SPIN — single-file slot game (store + expanded achievements/challenges)
   ============================================================ */

// ---------- SYMBOLS (value + weight) ----------
const SYMBOLS = [
  { id:'cherry',     emoji:'🍒', value:9,  weight:30 },
  { id:'lemon',      emoji:'🍋', value:15, weight:25 },
  { id:'orange',     emoji:'🍊', value:21, weight:20 },
  { id:'grapes',     emoji:'🍇', value:28, weight:16 },
  { id:'watermelon', emoji:'🍉', value:40, weight:12 },
  { id:'apple',      emoji:'🍎', value:55, weight:10 },
  { id:'pear',       emoji:'🍐', value:75, weight:8  },
  { id:'pineapple',  emoji:'🍍', value:120,weight:5  },
  { id:'strawberry', emoji:'🍓', value:180,weight:3  },
  { id:'banana',     emoji:'🍌', value:260,weight:2  },
];

// ---------- STORE (cleaned / extended) ----------
const STORE = [
  // (same as before — kept unchanged for brevity in this header, actual STORE unchanged)
  { id:'starter_bag',    cat:'upgrade', name:'Starter Bag',    icon:'💰', desc:'+50 starting coins each session',         price:500,    cur:'coins', max:5,  effect:{startCoins:50} },
  { id:'lucky_charm_1',  cat:'upgrade', name:'Lucky Charm I',  icon:'🍀', desc:'+2% chance for high-tier symbols',        price:1000,   cur:'coins', max:5,  effect:{luck:0.02} },
  { id:'lucky_charm_2',  cat:'upgrade', name:'Lucky Charm II', icon:'🌟', desc:'+5% high-tier chance (req: Charm I x5)', price:5000,   cur:'coins', max:3,  effect:{luck:0.05}, req:{lucky_charm_1:5} },
  { id:'payout_boost_1', cat:'upgrade', name:'Payout Boost I', icon:'📈', desc:'+10% all winnings',                       price:2000,   cur:'coins', max:5,  effect:{payoutMul:0.10} },
  { id:'payout_boost_2', cat:'upgrade', name:'Payout Boost II',icon:'🚀', desc:'+25% all winnings (req: Payout I x5)',  price:10000,  cur:'coins', max:3,  effect:{payoutMul:0.25}, req:{payout_boost_1:5} },
  { id:'gem_finder',     cat:'upgrade', name:'Gem Finder',     icon:'🔮', desc:'+1% gem chance per spin',                 price:3000,   cur:'coins', max:10, effect:{gemChance:0.01} },
  { id:'jackpot_seeker', cat:'upgrade', name:'Jackpot Seeker', icon:'🎯', desc:'2× jackpot payout',                       price:25000,  cur:'coins', max:1,  effect:{jackpotMul:1} },
  { id:'xp_boost',       cat:'upgrade', name:'XP Boost',       icon:'📚', desc:'+25% XP per spin',                        price:1500,   cur:'coins', max:4,  effect:{xpMul:0.25} },
  { id:'daily_double',   cat:'upgrade', name:'Daily Double',   icon:'📅', desc:'2× daily reward',                         price:8000,   cur:'coins', max:1,  effect:{dailyMul:1} },
  { id:'bet_unlock',     cat:'upgrade', name:'High Roller',    icon:'🎩', desc:'Unlock max bet 500 → 5000',               price:15000,  cur:'coins', max:1,  effect:{maxBet:5000} },
  { id:'auto_claim',     cat:'upgrade', name:'Auto Claim',     icon:'⚡', desc:'Auto-claim daily on login',               price:6000,   cur:'coins', max:1,  effect:{autoDaily:1} },
  { id:'lossback',       cat:'upgrade', name:'Lossback',       icon:'🛡️', desc:'5% of losses returned',                   price:12000,  cur:'coins', max:3,  effect:{lossback:0.05} },
  { id:'bonus_xp_pool',  cat:'upgrade', name:'Wisdom Pool',    icon:'🧠', desc:'+1 XP minimum per spin',                  price:800,    cur:'coins', max:5,  effect:{flatXp:1} },
  { id:'ultra_luck_1',   cat:'upgrade', name:'Ultra Luck I',   icon:'🍀', desc:'+10% rare symbol odds',                 price:25000,  cur:'coins', max:5, effect:{luck:0.10}},
  { id:'ultra_luck_2',   cat:'upgrade', name:'Ultra Luck II',  icon:'🌟', desc:'+20% rare symbol odds',                 price:100000, cur:'coins', max:3, effect:{luck:0.20}},
  { id:'coin_magnet',    cat:'upgrade', name:'Coin Magnet',    icon:'🧲', desc:'+20% coin wins',                        price:30000,  cur:'coins', max:5, effect:{payoutMul:0.20}},
  { id:'gem_magnet',     cat:'upgrade', name:'Gem Magnet',     icon:'💎', desc:'+2% gem chance',                       price:45000,  cur:'coins', max:5, effect:{gemChance:0.02}},
  { id:'xp_engine',      cat:'upgrade', name:'XP Engine',      icon:'⚙️', desc:'+50% XP gain',                         price:50000,  cur:'coins', max:5, effect:{xpMul:0.50}},
  { id:'high_roller_2',  cat:'upgrade', name:'High Roller II', icon:'🎩', desc:'Unlock 25,000 max bet',                 price:250000, cur:'coins', max:1, effect:{maxBet:25000}},
  { id:'lossback_plus',  cat:'upgrade', name:'Lossback+',      icon:'🛡️', desc:'+10% loss refunds',                   price:90000,  cur:'coins', max:3, effect:{lossback:0.10}},
  { id:'jackpot_core',   cat:'upgrade', name:'Jackpot Core',   icon:'🎰', desc:'Jackpots x3',                           price:300000, cur:'coins', max:1, effect:{jackpotMul:2}},
  { id:'daily_master',   cat:'upgrade', name:'Daily Master',   icon:'📅', desc:'3x daily rewards',                      price:150000, cur:'coins', max:1, effect:{dailyMul:2}},
  { id:'combo_master_2', cat:'upgrade', name:'Combo Master II',icon:'🎲', desc:'Pairs pay x5',                          price:175000, cur:'coins', max:1, effect:{pairMul:2}},
  { id:'upgrade_combo',  cat:'upgrade', name:'Combo Master',   icon:'🎲', desc:'Pair payout x4 (was x3)',              price:18000,  cur:'coins', max:1, effect:{pairMul:1}},
  { id:'upgrade_streak', cat:'upgrade', name:'Streak Bonus',   icon:'🔥', desc:'+5% per consecutive win (cap 50%)', price:7000,   cur:'coins', max:1, effect:{streak:1}},

  // ---- LUCK BOOSTERS (consumables, coins) ----
  { id:'rabbit_foot',  cat:'luck', name:"Rabbit's Foot", icon:'🐇', desc:'Next 10 spins: +10% luck', price:500,  cur:'coins', consumable:true, effect:{tempLuck:{spins:10,amt:0.10}} },
  { id:'horseshoe',    cat:'luck', name:'Horseshoe',     icon:'🧲', desc:'Next 25 spins: +15% luck', price:1500, cur:'coins', consumable:true, effect:{tempLuck:{spins:25,amt:0.15}} },
  { id:'fourleaf',     cat:'luck', name:'Four Leaf',     icon:'☘️', desc:'Next 50 spins: +20% luck', price:4000, cur:'coins', consumable:true, effect:{tempLuck:{spins:50,amt:0.20}} },

  // ---- CONSUMABLES (coins/gems) ----
  { id:'free_spins_5', cat:'consumable', name:'5 Free Spins',  icon:'🎟️', desc:'5 spins at current bet, free',  price:300, cur:'coins', consumable:true, effect:{freeSpins:5} },
  { id:'free_spins_20',cat:'consumable', name:'20 Free Spins', icon:'🎫', desc:'20 spins at current bet, free', price:1200,cur:'coins', consumable:true, effect:{freeSpins:20} },
  { id:'coin_pack_s',  cat:'consumable', name:'Coin Pack S',   icon:'💵', desc:'Get 1000 coins',                price:10,  cur:'gems',  consumable:true, effect:{giveCoins:1000} },
  { id:'coin_pack_m',  cat:'consumable', name:'Coin Pack M',   icon:'💴', desc:'Get 5000 coins',                price:40,  cur:'gems',  consumable:true, effect:{giveCoins:5000} },
  { id:'coin_pack_l',  cat:'consumable', name:'Coin Pack L',   icon:'💶', desc:'Get 25000 coins',               price:150, cur:'gems',  consumable:true, effect:{giveCoins:25000} },
  { id:'reroll',       cat:'consumable', name:'Reroll Token',  icon:'🔄', desc:'Re-spin the last result once',  price:5,   cur:'gems',  consumable:true, effect:{reroll:1} },
  { id:'gem_pack_s',   cat:'consumable', name:'Gem Pack S',    icon:'💎', desc:'Get 10 gems',                   price:2500,cur:'coins', consumable:true, effect:{giveGems:10} },
  { id:'gem_pack_m',   cat:'consumable', name:'Gem Pack M',    icon:'💠', desc:'Get 25 gems',                   price:6000,cur:'coins', consumable:true, effect:{giveGems:25} },
  { id:'gem_pack_l',   cat:'consumable', name:'Gem Pack L',    icon:'🔷', desc:'Get 75 gems',                   price:15000,cur:'coins', consumable:true, effect:{giveGems:75} },
  { id:'gem_pack_xl',  cat:'consumable', name:'Gem Pack XL',   icon:'✨', desc:'Get 150 gems',                  price:30000,cur:'coins', consumable:true, effect:{giveGems:150} },

  // ---- COSMETIC THEMES (gems) ----
  { id:'theme_neon',   cat:'theme', name:'Neon Theme',   icon:'🌃', desc:'Cyberpunk vibes',  price:50,  cur:'gems', effect:{theme:'neon'} },
  { id:'theme_gold',   cat:'theme', name:'Gold Theme',   icon:'🏆', desc:'Pure luxury',      price:75,  cur:'gems', effect:{theme:'gold'} },
  { id:'theme_candy',  cat:'theme', name:'Candy Theme',  icon:'🍬', desc:'Sweet pinks',      price:60,  cur:'gems', effect:{theme:'candy'} },
  { id:'theme_forest', cat:'theme', name:'Forest Theme', icon:'🌲', desc:'Earthy greens',    price:60,  cur:'gems', effect:{theme:'forest'} },
  { id:'theme_ocean',  cat:'theme', name:'Ocean Theme',  icon:'🌊', desc:'Deep blue calm',   price:60,  cur:'gems', effect:{theme:'ocean'} },
  { id:'theme_lava',   cat:'theme', name:'Lava Theme',   icon:'🌋', desc:'Hot molten vibes', price:100, cur:'gems', effect:{theme:'lava'}},
  { id:'theme_ice',    cat:'theme', name:'Ice Theme',    icon:'❄️', desc:'Frozen style',     price:100, cur:'gems', effect:{theme:'ice'}},
  { id:'theme_space',  cat:'theme', name:'Galaxy Theme', icon:'🌌', desc:'Stars everywhere', price:150, cur:'gems', effect:{theme:'space'}},
  { id:'theme_halloween', cat:'theme', name:'Halloween',  icon:'🎃', desc:'Spooky mode',      price:120, cur:'gems', effect:{theme:'halloween'}},
  { id:'theme_xmas',   cat:'theme', name:'Christmas',    icon:'🎄', desc:'Holiday vibes',    price:120, cur:'gems', effect:{theme:'xmas'}},

  // ---- AVATARS (gems) ----
  { id:'av_fox',     cat:'avatar', name:'Fox',     icon:'🦊', desc:'Sly avatar',  price:0,   cur:'gems', effect:{avatar:'🦊'}, defaultOwned:true },
  { id:'av_cat',     cat:'avatar', name:'Cat',     icon:'🐱', desc:'Cute avatar', price:20,  cur:'gems', effect:{avatar:'🐱'} },
  { id:'av_dog',     cat:'avatar', name:'Dog',     icon:'🐶', desc:'Loyal avatar',price:20,  cur:'gems', effect:{avatar:'🐶'} },
  { id:'av_panda',   cat:'avatar', name:'Panda',   icon:'🐼', desc:'Chill avatar',price:30,  cur:'gems', effect:{avatar:'🐼'} },
  { id:'av_lion',    cat:'avatar', name:'Lion',    icon:'🦁', desc:'King avatar', price:50,  cur:'gems', effect:{avatar:'🦁'} },
  { id:'av_dragon',  cat:'avatar', name:'Dragon',  icon:'🐲', desc:'Rare avatar', price:100, cur:'gems', effect:{avatar:'🐲'} },
  { id:'av_alien',   cat:'avatar', name:'Alien',   icon:'👽', desc:'UFO avatar',  price:80,  cur:'gems', effect:{avatar:'👽'} },
  { id:'av_robot',   cat:'avatar', name:'Robot',   icon:'🤖', desc:'Tech avatar', price:60,  cur:'gems', effect:{avatar:'🤖'} },
  { id:'av_ghost',   cat:'avatar', name:'Ghost',   icon:'👻', desc:'Spooky',      price:40,  cur:'gems', effect:{avatar:'👻'} },
  { id:'av_unicorn', cat:'avatar', name:'Unicorn', icon:'🦄', desc:'Mythic',      price:150, cur:'gems', effect:{avatar:'🦄'} },
  { id:'av_king',    cat:'avatar', name:'King',    icon:'🤴', desc:'Royal avatar',price:100, cur:'gems', effect:{avatar:'🤴'}},
  { id:'av_queen',   cat:'avatar', name:'Queen',   icon:'👸', desc:'Royal avatar',price:100, cur:'gems', effect:{avatar:'👸'}},
  { id:'av_wizard',  cat:'avatar', name:'Wizard',  icon:'🧙', desc:'Magic avatar',price:120, cur:'gems', effect:{avatar:'🧙'}},
  { id:'av_ninja',   cat:'avatar', name:'Ninja',   icon:'🥷', desc:'Stealth avatar',price:120,cur:'gems', effect:{avatar:'🥷'}},
  { id:'av_pirate',  cat:'avatar', name:'Pirate',  icon:'🏴‍☠️', desc:'Loot avatar', price:140, cur:'gems', effect:{avatar:'🏴‍☠️'}},
  { id:'av_crown',   cat:'avatar', name:'Crown',   icon:'👑', desc:'Royalty avatar',price:200,cur:'gems', effect:{avatar:'👑'} },
  { id:'av_devil',   cat:'avatar', name:'Devil',   icon:'😈', desc:'Mischief avatar',price:90, cur:'gems', effect:{avatar:'😈'} },

  // ---- COSMETICS (visual flair, gems) ----
  { id:'cos_confetti',  cat:'cosmetic', name:'Confetti FX',   icon:'🎉', desc:'Confetti on wins',        price:25, cur:'gems', effect:{fx:'confetti'} },
  { id:'cos_fireworks', cat:'cosmetic', name:'Fireworks FX',  icon:'🎆', desc:'Fireworks on jackpots',   price:50, cur:'gems', effect:{fx:'fireworks'} },
  { id:'cos_coinrain',  cat:'cosmetic', name:'Coin Rain',     icon:'🪙', desc:'Coin rain on big wins',   price:40, cur:'gems', effect:{fx:'coinrain'} },
  { id:'cos_sparkle',   cat:'cosmetic', name:'Sparkle Reels', icon:'✨', desc:'Sparkle border on reels', price:35, cur:'gems', effect:{fx:'sparkle'} },
  { id:'cos_shake',     cat:'cosmetic', name:'Win Shake',     icon:'📳', desc:'Screen shakes on wins',   price:20, cur:'gems', effect:{fx:'shake'} },
  { id:'cos_goldreel',  cat:'cosmetic', name:'Gold Reels',    icon:'🟡', desc:'Reels turn gold on win',  price:30, cur:'gems', effect:{fx:'goldreel'} },
  { id:'cos_neonborder',cat:'cosmetic', name:'Neon Border',   icon:'💠', desc:'Glowing machine border',  price:45, cur:'gems', effect:{fx:'neonborder'} },
  { id:'cos_emoji_rain',cat:'cosmetic', name:'Emoji Rain',    icon:'🌈', desc:'Emoji rain on jackpots',  price:55, cur:'gems', effect:{fx:'emojirain'} },
  { id:'cos_bigwin_text',cat:'cosmetic', name:'BIG WIN Banner',icon:'🏅', desc:'Banner on 50×+ wins',    price:35, cur:'gems', effect:{fx:'bigwinbanner'} },
];

// ---------- ACHIEVEMENTS (original + 50 new) ----------
const ACHIEVEMENTS = [
  { id:'first_spin',    name:'First Spin',     icon:'🎰', desc:'Spin once',          goal:1,    stat:'spins',     reward:{coins:100} },
  { id:'spins_100',     name:'Hundred Spins',  icon:'💯', desc:'Spin 100 times',     goal:100,  stat:'spins',     reward:{coins:500,gems:5} },
  { id:'spins_1000',    name:'Spin Master',    icon:'🏆', desc:'Spin 1000 times',    goal:1000, stat:'spins',     reward:{coins:5000,gems:25} },
  { id:'first_win',     name:'First Win',      icon:'🎉', desc:'Win once',           goal:1,    stat:'wins',      reward:{coins:200} },
  { id:'wins_50',       name:'Lucky Streak',   icon:'🍀', desc:'Win 50 times',       goal:50,   stat:'wins',      reward:{coins:1000,gems:10} },
  { id:'first_jackpot', name:'JACKPOT!',       icon:'💎', desc:'Hit your first jackpot',goal:1, stat:'jackpots',  reward:{coins:2000,gems:20} },
  { id:'jackpots_10',   name:'Jackpot King',   icon:'👑', desc:'Hit 10 jackpots',    goal:10,   stat:'jackpots',  reward:{coins:20000,gems:100} },
  { id:'won_10k',       name:'10K Club',       icon:'💰', desc:'Win 10,000 coins total',goal:10000,stat:'totalWon',reward:{gems:25} },
  { id:'won_100k',      name:'100K Club',      icon:'💸', desc:'Win 100,000 coins total',goal:100000,stat:'totalWon',reward:{gems:100} },
  { id:'level_10',      name:'Level 10',       icon:'⭐', desc:'Reach level 10',     goal:10,   stat:'level',     reward:{coins:5000} },
  { id:'level_25',      name:'Level 25',       icon:'🌟', desc:'Reach level 25',     goal:25,   stat:'level',     reward:{coins:25000,gems:50} },
  { id:'shopper',       name:'Shopper',        icon:'🛒', desc:'Buy 5 store items',  goal:5,    stat:'purchases', reward:{coins:1000} },

  /* ---------- SPIN MILESTONES ---------- */
  { id:'spins_2500',  name:'2.5K Spins', icon:'🎰', desc:'Spin 2,500 times', goal:2500, stat:'spins', reward:{coins:10000,gems:20} },
  { id:'spins_5000',  name:'5K Spins', icon:'🎰', desc:'Spin 5,000 times', goal:5000, stat:'spins', reward:{coins:25000,gems:40} },
  { id:'spins_7500',  name:'7.5K Spins', icon:'🎰', desc:'Spin 7,500 times', goal:7500, stat:'spins', reward:{coins:40000,gems:60} },
  { id:'spins_10000', name:'10K Spins', icon:'🎰', desc:'Spin 10,000 times', goal:10000, stat:'spins', reward:{coins:60000,gems:80} },
  { id:'spins_25000', name:'25K Spins', icon:'🎰', desc:'Spin 25,000 times', goal:25000, stat:'spins', reward:{coins:150000,gems:150} },

  /* ---------- WIN TOTALS ---------- */
  { id:'wins_100', name:'100 Wins', icon:'🏆', desc:'Win 100 times', goal:100, stat:'wins', reward:{coins:5000,gems:10} },
  { id:'wins_250', name:'250 Wins', icon:'🏆', desc:'Win 250 times', goal:250, stat:'wins', reward:{coins:12000,gems:20} },
  { id:'wins_500', name:'500 Wins', icon:'🏆', desc:'Win 500 times', goal:500, stat:'wins', reward:{coins:30000,gems:35} },
  { id:'wins_1000', name:'1,000 Wins', icon:'🏆', desc:'Win 1,000 times', goal:1000, stat:'wins', reward:{coins:75000,gems:60} },
  { id:'wins_2500', name:'2,500 Wins', icon:'🏆', desc:'Win 2,500 times', goal:2500, stat:'wins', reward:{coins:180000,gems:120} },

  /* ---------- JACKPOTS ---------- */
  { id:'jackpots_25', name:'25 Jackpots', icon:'💎', desc:'Hit 25 jackpots', goal:25, stat:'jackpots', reward:{coins:100000,gems:80} },
  { id:'jackpots_50', name:'50 Jackpots', icon:'💎', desc:'Hit 50 jackpots', goal:50, stat:'jackpots', reward:{coins:250000,gems:150} },
  { id:'jackpots_75', name:'75 Jackpots', icon:'💎', desc:'Hit 75 jackpots', goal:75, stat:'jackpots', reward:{coins:400000,gems:220} },
  { id:'jackpots_100', name:'100 Jackpots', icon:'💎', desc:'Hit 100 jackpots', goal:100, stat:'jackpots', reward:{coins:700000,gems:300} },
  { id:'jackpots_250', name:'250 Jackpots', icon:'💎', desc:'Hit 250 jackpots', goal:250, stat:'jackpots', reward:{coins:1500000,gems:500} },

  /* ---------- TOTAL WON ---------- */
  { id:'won_250k', name:'250K Club', icon:'💰', desc:'Win 250,000 coins total', goal:250000, stat:'totalWon', reward:{gems:120} },
  { id:'won_500k', name:'500K Club', icon:'💰', desc:'Win 500,000 coins total', goal:500000, stat:'totalWon', reward:{coins:100000,gems:200} },
  { id:'won_1m', name:'Millionaire', icon:'💸', desc:'Win 1,000,000 coins total', goal:1000000, stat:'totalWon', reward:{coins:250000,gems:350} },
  { id:'won_5m', name:'Tycoon', icon:'🏦', desc:'Win 5,000,000 coins total', goal:5000000, stat:'totalWon', reward:{coins:1000000,gems:750} },
  { id:'won_10m', name:'Casino Emperor', icon:'👑', desc:'Win 10,000,000 coins total', goal:10000000, stat:'totalWon', reward:{coins:2500000,gems:1500} },

  /* ---------- LEVEL ---------- */
  { id:'level_15', name:'Level 15', icon:'⭐', desc:'Reach level 15', goal:15, stat:'level', reward:{coins:15000,gems:10} },
  { id:'level_20', name:'Level 20', icon:'⭐', desc:'Reach level 20', goal:20, stat:'level', reward:{coins:25000,gems:20} },
  { id:'level_30', name:'Level 30', icon:'🌟', desc:'Reach level 30', goal:30, stat:'level', reward:{coins:50000,gems:35} },
  { id:'level_40', name:'Level 40', icon:'🌟', desc:'Reach level 40', goal:40, stat:'level', reward:{coins:80000,gems:50} },
  { id:'level_50', name:'Level 50', icon:'👑', desc:'Reach level 50', goal:50, stat:'level', reward:{coins:150000,gems:100} },

  /* ---------- PURCHASES ---------- */
  { id:'shopper_10', name:'Collector', icon:'🛒', desc:'Buy 10 store items', goal:10, stat:'purchases', reward:{coins:5000,gems:10} },
  { id:'shopper_25', name:'Regular Customer', icon:'🛒', desc:'Buy 25 store items', goal:25, stat:'purchases', reward:{coins:15000,gems:20} },
  { id:'shopper_50', name:'Big Spender', icon:'🛒', desc:'Buy 50 store items', goal:50, stat:'purchases', reward:{coins:50000,gems:35} },
  { id:'shopper_100', name:'Whale Energy', icon:'🐋', desc:'Buy 100 store items', goal:100, stat:'purchases', reward:{coins:120000,gems:70} },
  { id:'shopper_250', name:'Mall Owner', icon:'🏬', desc:'Buy 250 store items', goal:250, stat:'purchases', reward:{coins:300000,gems:150} },

  /* ---------- TODAY SPINS ---------- */
  { id:'today_spins_50', name:'Daily Grinder', icon:'📅', desc:'Spin 50 times in one day', goal:50, stat:'todaySpins', reward:{coins:5000,gems:10} },
  { id:'today_spins_100', name:'Daily Addict', icon:'📅', desc:'Spin 100 times in one day', goal:100, stat:'todaySpins', reward:{coins:15000,gems:20} },
  { id:'today_spins_250', name:'No Breaks', icon:'📅', desc:'Spin 250 times in one day', goal:250, stat:'todaySpins', reward:{coins:50000,gems:35} },
  { id:'today_spins_500', name:'Machine Melted', icon:'🔥', desc:'Spin 500 times in one day', goal:500, stat:'todaySpins', reward:{coins:120000,gems:70} },
  { id:'today_spins_1000', name:'Unstoppable', icon:'⚡', desc:'Spin 1,000 times in one day', goal:1000, stat:'todaySpins', reward:{coins:300000,gems:150} },

  /* ---------- TODAY WON ---------- */
  { id:'today_won_10k', name:'Hot Day', icon:'💵', desc:'Earn 10,000 coins in one day', goal:10000, stat:'todayWon', reward:{coins:5000,gems:10} },
  { id:'today_won_50k', name:'Loaded Day', icon:'💵', desc:'Earn 50,000 coins in one day', goal:50000, stat:'todayWon', reward:{coins:15000,gems:20} },
  { id:'today_won_100k', name:'Golden Day', icon:'💵', desc:'Earn 100,000 coins in one day', goal:100000, stat:'todayWon', reward:{coins:40000,gems:40} },
  { id:'today_won_500k', name:'Legendary Day', icon:'💵', desc:'Earn 500,000 coins in one day', goal:500000, stat:'todayWon', reward:{coins:150000,gems:80} },
  { id:'today_won_1m', name:'Historic Day', icon:'💵', desc:'Earn 1,000,000 coins in one day', goal:1000000, stat:'todayWon', reward:{coins:350000,gems:150} },

  /* ---------- TODAY JACKPOTS ---------- */
  { id:'today_jp_3', name:'Triple Boom', icon:'💎', desc:'Hit 3 jackpots in one day', goal:3, stat:'todayJackpots', reward:{coins:25000,gems:25} },
  { id:'today_jp_5', name:'Jackpot Rush', icon:'💎', desc:'Hit 5 jackpots in one day', goal:5, stat:'todayJackpots', reward:{coins:60000,gems:40} },
  { id:'today_jp_10', name:'Diamond Storm', icon:'💎', desc:'Hit 10 jackpots in one day', goal:10, stat:'todayJackpots', reward:{coins:150000,gems:80} },
  { id:'today_jp_25', name:'Impossible Odds', icon:'💎', desc:'Hit 25 jackpots in one day', goal:25, stat:'todayJackpots', reward:{coins:500000,gems:200} },
  { id:'today_jp_50', name:'Chosen One', icon:'👑', desc:'Hit 50 jackpots in one day', goal:50, stat:'todayJackpots', reward:{coins:1500000,gems:500} },

  /* ---------- Additional 50 achievements (new) ---------- */
  { id:'extra_spins_15000', name:'15K Spinner', icon:'🔁', desc:'Spin 15,000 times', goal:15000, stat:'spins', reward:{coins:20000,gems:15} },
  { id:'extra_spins_30000', name:'30K Spinner', icon:'🔁', desc:'Spin 30,000 times', goal:30000, stat:'spins', reward:{coins:50000,gems:30} },
  { id:'extra_spins_50000', name:'50K Spinner', icon:'🔁', desc:'Spin 50,000 times', goal:50000, stat:'spins', reward:{coins:120000,gems:60} },
  { id:'extra_spins_100000', name:'100K Spinner', icon:'🔁', desc:'Spin 100,000 times', goal:100000, stat:'spins', reward:{coins:300000,gems:120} },

  { id:'extra_wins_10000', name:'10K Wins', icon:'🏅', desc:'Win 10,000 times', goal:10000, stat:'wins', reward:{coins:200000,gems:80} },
  { id:'extra_wins_25000', name:'25K Wins', icon:'🏅', desc:'Win 25,000 times', goal:25000, stat:'wins', reward:{coins:500000,gems:150} },

  { id:'extra_totalwon_2_5m', name:'2.5M Winner', icon:'💰', desc:'Win 2,500,000 total', goal:2500000, stat:'totalWon', reward:{coins:100000,gems:40} },
  { id:'extra_totalwon_20m', name:'20M Club', icon:'💰', desc:'Win 20,000,000 total', goal:20000000, stat:'totalWon', reward:{coins:1000000,gems:500} },

  { id:'extra_bigwin_1000', name:'Big Win 1K', icon:'💥', desc:'Have a single win ≥ 1,000', goal:1000, stat:'biggestWin', reward:{coins:5000,gems:10} },
  { id:'extra_bigwin_5000', name:'Big Win 5K', icon:'💥', desc:'Have a single win ≥ 5,000', goal:5000, stat:'biggestWin', reward:{coins:30000,gems:30} },
  { id:'extra_bigwin_20000', name:'Big Win 20K', icon:'💥', desc:'Have a single win ≥ 20,000', goal:20000, stat:'biggestWin', reward:{coins:150000,gems:80} },

  { id:'extra_level_60', name:'Level 60', icon:'⭐', desc:'Reach level 60', goal:60, stat:'level', reward:{coins:200000,gems:100} },
  { id:'extra_level_80', name:'Level 80', icon:'⭐', desc:'Reach level 80', goal:80, stat:'level', reward:{coins:500000,gems:200} },

  { id:'extra_purchases_500', name:'Frequent Buyer', icon:'🛍️', desc:'Buy 500 store items', goal:500, stat:'purchases', reward:{coins:400000,gems:150} },
  { id:'extra_purchases_1000', name:'Mall Magnate', icon:'🏬', desc:'Buy 1,000 store items', goal:1000, stat:'purchases', reward:{coins:1000000,gems:400} },

  { id:'extra_gems_collector_100', name:'Gem Hoarder', icon:'💎', desc:'Hold 100 gems at once', goal:100, stat:'gems', reward:{coins:50000,gems:10} },
  { id:'extra_gems_collector_500', name:'Gem Baron', icon:'💎', desc:'Hold 500 gems at once', goal:500, stat:'gems', reward:{coins:250000,gems:50} },

  { id:'extra_jackpot_500', name:'500 Jackpots', icon:'💠', desc:'Hit 500 jackpots', goal:500, stat:'jackpots', reward:{coins:1000000,gems:300} },
  { id:'extra_jackpot_1000', name:'1000 Jackpots', icon:'💠', desc:'Hit 1,000 jackpots', goal:1000, stat:'jackpots', reward:{coins:2500000,gems:700} },

  { id:'extra_today_spins_2000', name:'Daily Marathon', icon:'🏃', desc:'Spin 2,000 times in one day', goal:2000, stat:'todaySpins', reward:{coins:200000,gems:80} },
  { id:'extra_today_won_2m', name:'Monster Day', icon:'🔥', desc:'Earn 2,000,000 in one day', goal:2000000, stat:'todayWon', reward:{coins:500000,gems:200} },

  { id:'extra_consecutive_win_10', name:'Hot Streak 10', icon:'🔥', desc:'Have a 10-win streak', goal:10, stat:'winStreak', reward:{coins:5000,gems:5} },
  { id:'extra_consecutive_win_25', name:'Inferno 25', icon:'🔥', desc:'Have a 25-win streak', goal:25, stat:'winStreak', reward:{coins:50000,gems:25} },

  { id:'extra_lossback_user', name:'Safety Net', icon:'🛡️', desc:'Own Lossback+ upgrade', goal:1, stat:'purchases', reward:{coins:25000,gems:10} },

  { id:'extra_combo_pairs_100', name:'Pair Master', icon:'🎲', desc:'Get 100 pair wins', goal:100, stat:'wins', reward:{coins:20000,gems:10} },
  { id:'extra_combo_triples_50', name:'Triple Master', icon:'🎰', desc:'Get 50 triple wins', goal:50, stat:'wins', reward:{coins:50000,gems:25} },

  { id:'extra_total_coins_1m', name:'Net Worth 1M', icon:'💵', desc:'Have 1,000,000 coins at once', goal:1000000, stat:'coins', reward:{gems:100} },
  { id:'extra_total_coins_5m', name:'Net Worth 5M', icon:'💵', desc:'Have 5,000,000 coins at once', goal:5000000, stat:'coins', reward:{gems:300} },

  { id:'extra_avatar_collect_10', name:'Avatar Collector', icon:'🧑‍🎨', desc:'Own 10 avatars', goal:10, stat:'purchases', reward:{coins:12000,gems:8} },
  { id:'extra_avatar_collect_20', name:'Avatar Curator', icon:'🧑‍🎨', desc:'Own 20 avatars', goal:20, stat:'purchases', reward:{coins:60000,gems:30} },

  { id:'extra_cosmetic_own_10', name:'Cosmetic Hoarder', icon:'✨', desc:'Own 10 cosmetics', goal:10, stat:'purchases', reward:{coins:20000,gems:20} },

  { id:'extra_use_reroll_50', name:'Reroller', icon:'🔁', desc:'Use 50 rerolls', goal:50, stat:'rerolls', reward:{coins:15000,gems:10} },

  { id:'extra_free_spins_used_100', name:'Free Spinner', icon:'🎟️', desc:'Use 100 free spins', goal:100, stat:'freeSpins', reward:{coins:25000,gems:15} },

  { id:'extra_achievements_50', name:'Achievement Hunter', icon:'🏆', desc:'Unlock 50 achievements', goal:50, stat:'unlockedCount', reward:{coins:50000,gems:40} },
  { id:'extra_achievements_100', name:'Legendary Hunter', icon:'🏆', desc:'Unlock 100 achievements', goal:100, stat:'unlockedCount', reward:{coins:200000,gems:120} },

  { id:'extra_social_share_1', name:'First Share', icon:'📣', desc:'(Placeholder) Share your score', goal:1, stat:'shares', reward:{gems:5} },
  { id:'extra_social_share_10', name:'Promoter', icon:'📣', desc:'(Placeholder) Share 10 times', goal:10, stat:'shares', reward:{gems:50} },

  { id:'extra_daily_streak_7', name:'Week Streak', icon:'📆', desc:'Keep daily streak for 7 days', goal:7, stat:'dailyStreak', reward:{coins:15000,gems:10} },
  { id:'extra_daily_streak_30', name:'Month Streak', icon:'📆', desc:'Keep daily streak for 30 days', goal:30, stat:'dailyStreak', reward:{coins:100000,gems:50} },

  { id:'extra_special_event_1', name:'Event Winner', icon:'🎉', desc:'Participate in a live event', goal:1, stat:'events', reward:{coins:50000,gems:25} },

  { id:'extra_collection_complete_1', name:'Collection Starter', icon:'📚', desc:'Collect 5 themed items', goal:5, stat:'purchases', reward:{coins:8000,gems:6} },

  { id:'extra_master_gambler', name:'Master Gambler', icon:'🎲', desc:'Accumulate 1,000,000 total bets', goal:1000000, stat:'totalBets', reward:{coins:500000,gems:200} },

  { id:'extra_rare_symbol_love', name:'Rare Collector', icon:'🍍', desc:'Land 100 rare symbols', goal:100, stat:'rareLanded', reward:{coins:30000,gems:20} },

  { id:'extra_long_play_session', name:'Endurance', icon:'⏱️', desc:'Play nonstop for 4 hours', goal:240, stat:'sessionMinutes', reward:{coins:25000,gems:15} },

  { id:'extra_50', name:'Mystery Bonus', icon:'🎁', desc:'Surprise reward', goal:1, stat:'mysteryStat', reward:{coins:10000,gems:5} },

];

// Note: Some of the above stats (like 'shares', 'events', 'totalBets', 'rareLanded', 'sessionMinutes', 'unlockedCount', 'mysteryStat')
// are placeholders to allow flexible future tracking; they won't unlock until those counters are incremented somewhere in code.
// However many use existing stats (spins, wins, totalWon, biggestWin, level, purchases, gems, jackpots, today*).

// ---------- DAILY CHALLENGE TEMPLATES (original + 20 new) ----------
const CHALLENGE_TEMPLATES = [
  { id:'spin_x',  name:n=>`Spin ${n} times`,    stat:'todaySpins',    base:30,  reward:{coins:500} },
  { id:'win_x',   name:n=>`Win ${n} times`,     stat:'todayWins',     base:8,   reward:{coins:800,gems:5} },
  { id:'earn_x',  name:n=>`Earn ${n} coins`,    stat:'todayWon',      base:1500,reward:{coins:1000,gems:5} },
  { id:'jackpot', name:_=>`Hit a jackpot`,      stat:'todayJackpots', base:1,   reward:{coins:3000,gems:15} },

  { id:'spin_75',   name:n=>`Spin ${n} times`, stat:'todaySpins', base:75, reward:{coins:1200,gems:3} },
  { id:'spin_150',  name:n=>`Spin ${n} times`, stat:'todaySpins', base:150, reward:{coins:2500,gems:5} },
  { id:'spin_300',  name:n=>`Spin ${n} times`, stat:'todaySpins', base:300, reward:{coins:6000,gems:8} },
  { id:'spin_500',  name:n=>`Spin ${n} times`, stat:'todaySpins', base:500, reward:{coins:12000,gems:12} },

  { id:'win_15',    name:n=>`Win ${n} times`, stat:'todayWins', base:15, reward:{coins:1800,gems:4} },
  { id:'win_30',    name:n=>`Win ${n} times`, stat:'todayWins', base:30, reward:{coins:4200,gems:7} },
  { id:'win_60',    name:n=>`Win ${n} times`, stat:'todayWins', base:60, reward:{coins:9000,gems:10} },
  { id:'win_100',   name:n=>`Win ${n} times`, stat:'todayWins', base:100, reward:{coins:18000,gems:15} },

  { id:'earn_5k',   name:n=>`Earn ${n.toLocaleString()} coins`, stat:'todayWon', base:5000, reward:{coins:2500,gems:4} },
  { id:'earn_10k',  name:n=>`Earn ${n.toLocaleString()} coins`, stat:'todayWon', base:10000, reward:{coins:5000,gems:6} },
  { id:'earn_25k',  name:n=>`Earn ${n.toLocaleString()} coins`, stat:'todayWon', base:25000, reward:{coins:12000,gems:10} },
  { id:'earn_50k',  name:n=>`Earn ${n.toLocaleString()} coins`, stat:'todayWon', base:50000, reward:{coins:25000,gems:15} },
  { id:'earn_100k', name:n=>`Earn ${n.toLocaleString()} coins`, stat:'todayWon', base:100000, reward:{coins:50000,gems:25} },

  { id:'jp_2',      name:_=>`Hit 2 jackpots`, stat:'todayJackpots', base:2, reward:{coins:8000,gems:10} },
  { id:'jp_3',      name:_=>`Hit 3 jackpots`, stat:'todayJackpots', base:3, reward:{coins:15000,gems:15} },
  { id:'jp_5',      name:_=>`Hit 5 jackpots`, stat:'todayJackpots', base:5, reward:{coins:35000,gems:25} },

  { id:'marathon',  name:_=>`Play a marathon (750 spins)`, stat:'todaySpins', base:750, reward:{coins:30000,gems:20} },
  { id:'winner_day',name:_=>`Win 200 times today`, stat:'todayWins', base:200, reward:{coins:40000,gems:25} },

  { id:'rich_run',  name:_=>`Earn 250,000 coins today`, stat:'todayWon', base:250000, reward:{coins:100000,gems:40} },
  { id:'legend_day',name:_=>`Hit 10 jackpots today`, stat:'todayJackpots', base:10, reward:{coins:150000,gems:60} },

  /* ---------- 20 NEW DAILY TEMPLATES ---------- */
  { id:'spin_200',  name:n=>`Spin ${n} times`, stat:'todaySpins', base:200, reward:{coins:7000,gems:6} },
  { id:'spin_1000', name:n=>`Spin ${n} times`, stat:'todaySpins', base:1000, reward:{coins:40000,gems:30} },
  { id:'win_5',     name:n=>`Win ${n} times`, stat:'todayWins', base:5, reward:{coins:600,gems:2} },
  { id:'win_250',   name:n=>`Win ${n} times`, stat:'todayWins', base:250, reward:{coins:50000,gems:35} },
  { id:'earn_200k', name:n=>`Earn ${n.toLocaleString()} coins`, stat:'todayWon', base:200000, reward:{coins:90000,gems:30} },
  { id:'earn_500k', name:n=>`Earn ${n.toLocaleString()} coins`, stat:'todayWon', base:500000, reward:{coins:200000,gems:80} },
  { id:'jp_1',      name:_=>`Hit 1 jackpot`, stat:'todayJackpots', base:1, reward:{coins:2000,gems:8} },
  { id:'jp_15',     name:_=>`Hit 15 jackpots`, stat:'todayJackpots', base:15, reward:{coins:200000,gems:90} },
  { id:'spin_20',   name:n=>`Spin ${n} times`, stat:'todaySpins', base:20, reward:{coins:800,gems:2} },
  { id:'spin_600',  name:n=>`Spin ${n} times`, stat:'todaySpins', base:600, reward:{coins:14000,gems:10} },
  { id:'win_3',     name:n=>`Win ${n} times`, stat:'todayWins', base:3, reward:{coins:400,gems:1} },
  { id:'win_500',   name:n=>`Win ${n} times`, stat:'todayWins', base:500, reward:{coins:100000,gems:50} },
  { id:'earn_1m',   name:n=>`Earn ${n.toLocaleString()} coins`, stat:'todayWon', base:1000000, reward:{coins:350000,gems:120} },
  { id:'spin_50',   name:n=>`Spin ${n} times`, stat:'todaySpins', base:50, reward:{coins:1200,gems:3} },
  { id:'spin_1200', name:n=>`Spin ${n} times`, stat:'todaySpins', base:1200, reward:{coins:50000,gems:40} },
  { id:'win_400',   name:n=>`Win ${n} times`, stat:'todayWins', base:400, reward:{coins:90000,gems:40} },
  { id:'earn_750k', name:n=>`Earn ${n.toLocaleString()} coins`, stat:'todayWon', base:750000, reward:{coins:250000,gems:90} },
  { id:'spin_360',  name:n=>`Spin ${n} times`, stat:'todaySpins', base:360, reward:{coins:20000,gems:12} },
  { id:'win_75',    name:n=>`Win ${n} times`, stat:'todayWins', base:75, reward:{coins:12000,gems:12} },
  { id:'jp_20',     name:_=>`Hit 20 jackpots`, stat:'todayJackpots', base:20, reward:{coins:400000,gems:160} },
];

// ---------- LEADERBOARD CONFIG ----------
const LEADERBOARD_BLOB_ID = null;
const LB_URL = LEADERBOARD_BLOB_ID ? `https://jsonblob.com/api/jsonBlob/${LEADERBOARD_BLOB_ID}` : null;

// ---------- STATE ----------
const DEFAULT_STATE = {
  username:'', avatar:'🦊', color:'#ffd700', theme:'default',
  coins:1000, gems:10,
  bet:10, level:1, xp:0,
  spins:0, wins:0, jackpots:0, totalWon:0, biggestWin:0, purchases:0,
  todaySpins:0, todayWins:0, todayWon:0, todayJackpots:0,
  lastDaily:0, dailyStreak:0, lastChallengeDay:0,
  inventory:{}, // {itemId: count}
  fx:{}, // active cosmetic effects {fxName: true}
  challenges:[], // [{tplId, target, claimed}]
  tempLuckSpins:0, tempLuckAmt:0,
  freeSpins:0, rerolls:0, lastResult:null,
  winStreak:0, unlocked:{}
};

let S = load();

function load(){
  try{
    const raw = localStorage.getItem('luckyspin');
    if(!raw) return structuredClone(DEFAULT_STATE);
    const parsed = JSON.parse(raw);
    // backward compatibility: compute derived counters if missing
    parsed.unlocked = parsed.unlocked || {};
    return Object.assign(structuredClone(DEFAULT_STATE), parsed);
  }catch{ return structuredClone(DEFAULT_STATE); }
}
function save(){ localStorage.setItem('luckyspin', JSON.stringify(S)); }

// ---------- HELPERS ----------
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);
function toast(msg, type=''){
  const el = document.createElement('div');
  el.className = 'toast '+type;
  el.textContent = msg;
  $('#toast-host').appendChild(el);
  setTimeout(()=>el.remove(), 3000);
}
function xpNeeded(lvl){ return 100 + (lvl-1)*50; }
function ownedCount(id){ return S.inventory[id] || 0; }
function isOwned(id){ return ownedCount(id) > 0 || STORE.find(i=>i.id===id)?.defaultOwned; }

// Aggregate effects from owned items and active cosmetics
function effects(){
  const eff = { startCoins:0, luck:0, payoutMul:0, gemChance:0, jackpotMul:0,
                xpMul:0, dailyMul:0, maxBet:500, autoDaily:0, lossback:0,
                flatXp:0, pairMul:0, streak:false, ownedAvatars:[], theme:'default', fx:[] };

  for(const item of STORE){
    const cnt = ownedCount(item.id) || (item.defaultOwned?1:0);
    if(!cnt) continue;
    const e = item.effect || {};
    if(e.startCoins) eff.startCoins += e.startCoins*cnt;
    if(e.luck) eff.luck += e.luck*cnt;
    if(e.payoutMul) eff.payoutMul += e.payoutMul*cnt;
    if(e.gemChance) eff.gemChance += e.gemChance*cnt;
    if(e.jackpotMul) eff.jackpotMul += e.jackpotMul*cnt;
    if(e.xpMul) eff.xpMul += e.xpMul*cnt;
    if(e.dailyMul) eff.dailyMul += e.dailyMul*cnt;
    if(e.maxBet) eff.maxBet = Math.max(eff.maxBet, e.maxBet);
    if(e.autoDaily) eff.autoDaily = 1;
    if(e.lossback) eff.lossback += e.lossback*cnt;
    if(e.flatXp) eff.flatXp += e.flatXp*cnt;
    if(e.pairMul) eff.pairMul += e.pairMul*cnt;
    if(e.streak) eff.streak = true;
    if(e.avatar) eff.ownedAvatars.push(e.avatar);
    if(e.theme) eff.theme = e.theme;
  }

  eff.fx = Object.keys(S.fx || {}).filter(k=>S.fx[k]);
  eff.theme = S.theme || eff.theme || 'default';
  if(!eff.ownedAvatars.includes('🦊')) eff.ownedAvatars.unshift('🦊');
  return eff;
}

// ---------- SPIN LOGIC ----------
function pickSymbol(luckBoost=0){
  const adjusted = SYMBOLS.map((s,i)=>{
    const tierBoost = i >= 5 ? (1 + luckBoost*5) : 1;
    return { s, w: s.weight * tierBoost };
  });
  const total = adjusted.reduce((a,b)=>a+b.w,0);
  let r = Math.random()*total;
  for(const a of adjusted){ r-=a.w; if(r<=0) return a.s; }
  return SYMBOLS[0];
}

function calcPayout(reels, bet){
  const eff = effects();
  const betMul = bet/5;
  let payout = 0, type='lose', label='No win';

  if(reels[0].id===reels[1].id && reels[1].id===reels[2].id){
    payout = reels[0].value * 10 * betMul;
    type = (reels[0].value >= 180) ? 'jackpot' : 'win';
    label = `TRIPLE ${reels[0].emoji}! +${Math.floor(payout)} 🪙`;
    if(type==='jackpot'){
      payout *= (1 + eff.jackpotMul);
      label = `🎰 JACKPOT! +${Math.floor(payout)} 🪙`;
    }
  } else if(reels[0].id===reels[1].id || reels[1].id===reels[2].id || reels[0].id===reels[2].id){
    const pairSym = reels[0].id===reels[1].id ? reels[0] : (reels[1].id===reels[2].id ? reels[1] : reels[0]);
    const mul = 3 + (eff.pairMul ? eff.pairMul : 0);
    payout = pairSym.value * mul * betMul;
    type='win';
    label=`Pair ${pairSym.emoji}! +${Math.floor(payout)} 🪙`;
  } else {
    const best = reels.reduce((a,b)=> b.value>a.value ? b : a);
    payout = best.value * betMul * 0.5;
    label = `Small win ${best.emoji} +${Math.floor(payout)} 🪙`;
    type = payout > 0 ? 'win' : 'lose';
  }

  payout = payout * (1 + eff.payoutMul);

  if(eff.streak && type!=='lose' && S.winStreak > 0){
    const bonus = Math.min(S.winStreak * 0.05, 0.5);
    payout *= (1 + bonus);
  }

  return { payout: Math.floor(payout), type, label };
}

let spinning = false;
async function spin(isFree=false){
  if(spinning) return;
  if(!isFree && S.coins < S.bet){ toast('Not enough coins!', 'bad'); return; }
  spinning = true;
  $('#spin-btn').disabled = true;

  if(!isFree && S.freeSpins > 0){ S.freeSpins--; isFree = true; toast(`Free spin used (${S.freeSpins} left)`); }
  if(!isFree) S.coins -= S.bet;

  const eff = effects();
  let luck = eff.luck || 0;
  if(S.tempLuckSpins > 0){ luck += S.tempLuckAmt || 0; S.tempLuckSpins--; }

  const reelEls = [$('#reel-0'), $('#reel-1'), $('#reel-2')];
  reelEls.forEach(r => r.classList.add('spinning'));
  const final = [];
  for(let i=0;i<3;i++){
    final.push(pickSymbol(luck));
    await new Promise(res=>setTimeout(res, 300+i*200));
    reelEls[i].classList.remove('spinning');
    reelEls[i].textContent = final[i].emoji;
  }

  const { payout, type, label } = calcPayout(final, S.bet);
  S.spins++; S.todaySpins++;
  S.lastResult = { reels: final.map(r=>r.id), bet:S.bet, payout, type };

  if(type !== 'lose' || payout > 0){
    S.coins += payout;
    S.totalWon += payout; S.todayWon += payout;
    if(payout > S.biggestWin) S.biggestWin = payout;
    S.wins++; S.todayWins++;
    S.winStreak++;
    if(type==='jackpot'){ S.jackpots++; S.todayJackpots++; }
    reelEls.forEach(r=>r.classList.add('win'));
    setTimeout(()=>reelEls.forEach(r=>r.classList.remove('win')), 1500);
    triggerWinFX(type, payout);
  } else {
    S.winStreak = 0;
    if(eff.lossback > 0 && !isFree){
      const back = Math.floor(S.bet * eff.lossback);
      if(back > 0){ S.coins += back; toast(`Lossback: +${back} 🪙`); }
    }
  }

  if(Math.random() < (eff.gemChance || 0)){ S.gems += 1; toast(`+1 💎`); }

  const xp = Math.max(1, Math.floor((1 + (eff.flatXp||0)) * (1 + (eff.xpMul||0))));
  S.xp += xp;
  while(S.xp >= xpNeeded(S.level)){
    S.xp -= xpNeeded(S.level);
    S.level++;
    toast(`🎉 Level up! Now level ${S.level}`, 'good');
    S.coins += S.level * 100;
    S.gems += 1;
  }

  const rm = $('#result-msg');
  rm.textContent = label;
  rm.className = 'result ' + (type==='jackpot'?'jackpot':type==='win'?'win':'');

  checkAchievements();
  updateChallenges();
  save(); renderHud(); renderProfile();
  pushLeaderboard();
  spinning = false;
  $('#spin-btn').disabled = false;
}

// ---------- WIN FX ----------
function triggerWinFX(type, payout){
  const eff = effects();
  if(eff.fx.includes('shake') && payout > 0){
    document.body.animate(
      [{transform:'translate(0,0)'},{transform:'translate(-5px,3px)'},{transform:'translate(5px,-3px)'},{transform:'translate(0,0)'}],
      {duration:300}
    );
  }
  if(eff.fx.includes('confetti') && type==='win') burstEmojis(['🎉','🎊','✨'], 20);
  if(eff.fx.includes('fireworks') && type==='jackpot') burstEmojis(['🎆','🎇','💥'], 40);
  if(eff.fx.includes('coinrain') && payout >= S.bet*5) burstEmojis(['🪙','💰'], 25);
  if(eff.fx.includes('emojirain') && type==='jackpot') burstEmojis(['🌈','⭐','💎','🍀','🎰'], 50);
  if(eff.fx.includes('bigwinbanner') && payout >= S.bet*50){
    const b = document.createElement('div');
    b.textContent = '🏅 BIG WIN! 🏅';
    b.style.cssText = 'position:fixed;top:40%;left:50%;transform:translate(-50%,-50%);font-size:60px;color:gold;text-shadow:0 0 20px gold;z-index:200;animation:fadeout 2s forwards';
    document.body.appendChild(b);
    setTimeout(()=>b.remove(), 2000);
  }
}
function burstEmojis(emojis, n){
  for(let i=0;i<n;i++){
    const e = document.createElement('div');
    e.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    e.style.cssText = `position:fixed;left:${Math.random()*100}vw;top:-30px;font-size:${20+Math.random()*20}px;z-index:150;pointer-events:none;transition:transform 2s linear,opacity 2s`;
    document.body.appendChild(e);
    requestAnimationFrame(()=>{
      e.style.transform = `translateY(110vh) rotate(${Math.random()*720}deg)`;
      e.style.opacity = '0';
    });
    setTimeout(()=>e.remove(), 2200);
  }
}

// ---------- DAILY REWARD ----------
function claimDaily(){
  const now = Date.now();
  const oneDay = 86400000;
  if(now - S.lastDaily < oneDay){
    const rem = oneDay - (now - S.lastDaily);
    const h = Math.floor(rem/3600000), m = Math.floor((rem%3600000)/60000);
    toast(`Come back in ${h}h ${m}m`, 'bad');
    return;
  }
  if(now - S.lastDaily < oneDay*2) S.dailyStreak++;
  else S.dailyStreak = 1;
  S.lastDaily = now;

  const eff = effects();
  const baseCoins = 200 * S.dailyStreak;
  const baseGems = Math.min(S.dailyStreak, 10);
  const mul = 1 + (eff.dailyMul || 0);
  const gotCoins = Math.floor(baseCoins * mul);
  const gotGems = Math.floor(baseGems * mul);
  S.coins += gotCoins; S.gems += gotGems;
  toast(`Day ${S.dailyStreak}! +${gotCoins}🪙 +${gotGems}💎`, 'good');
  save(); renderHud();
}

// ---------- CHALLENGES ----------
function dayKey(){ return Math.floor(Date.now()/86400000); }
function rollChallenges(){
  const today = dayKey();
  if(S.lastChallengeDay !== today){
    S.lastChallengeDay = today;
    S.todaySpins=0; S.todayWins=0; S.todayWon=0; S.todayJackpots=0;
    const shuffled = [...CHALLENGE_TEMPLATES].sort(()=>Math.random()-0.5).slice(0,3);
    S.challenges = shuffled.map(t => ({
      tplId: t.id,
      target: t.base + Math.floor(Math.random()*t.base*0.5),
      claimed: false,
    }));
    save();
  }
}
function updateChallenges(){
  renderChallenges();
}
function claimChallenge(tplId){
  const c = S.challenges.find(x=>x.tplId===tplId);
  const t = CHALLENGE_TEMPLATES.find(x=>x.id===tplId);
  if(!c || !t) return;
  if(c.claimed) return;
  if(S[t.stat] < c.target){ toast('Not complete yet'); return; }
  c.claimed = true;
  if(t.reward.coins) S.coins += t.reward.coins;
  if(t.reward.gems) S.gems += t.reward.gems;
  toast(`Challenge done! +${t.reward.coins||0}🪙 +${t.reward.gems||0}💎`,'good');
  save(); renderHud(); renderChallenges();
}

// ---------- ACHIEVEMENTS ----------
function checkAchievements(){
  S.unlocked = S.unlocked || {};
  // populate derived stats like unlockedCount if missing
  S.unlockedCount = Object.keys(S.unlocked || {}).length;
  for(const a of ACHIEVEMENTS){
    if(S.unlocked[a.id]) continue;
    if((S[a.stat] || 0) >= a.goal){
      S.unlocked[a.id] = true;
      if(a.reward.coins) S.coins += a.reward.coins;
      if(a.reward.gems) S.gems += a.reward.gems;
      toast(`🏆 ${a.name} unlocked! +${a.reward.coins||0}🪙 +${a.reward.gems||0}💎`,'good');
    }
  }
  renderAchievements();
}

// ---------- STORE (buy / use / render) ----------
function meetsRequirements(item){
  if(!item.req) return true;
  for(const k in item.req){
    if(ownedCount(k) < item.req[k]) return false;
  }
  return true;
}

function buyItem(id){
  const item = STORE.find(x=>x.id===id);
  if(!item) return;
  const cnt = ownedCount(id);
  if(item.max && cnt >= item.max){ toast('Max owned'); return; }
  if(!item.consumable && !item.max && cnt >= 1 && !item.defaultOwned){ toast('Already owned'); return; }
  if(!meetsRequirements(item)){ toast('Requirements not met','bad'); return; }
  if(S[item.cur] < item.price){ toast(`Not enough ${item.cur}`,'bad'); return; }

  S[item.cur] -= item.price;
  S.inventory[id] = (S.inventory[id] || 0) + 1;
  S.purchases++;

  const e = item.effect || {};
  if(e.giveCoins) S.coins += e.giveCoins;
  if(e.giveGems) S.gems += e.giveGems;
  if(e.freeSpins) S.freeSpins += e.freeSpins;
  if(e.reroll) S.rerolls += e.reroll || 1;
  if(e.tempLuck){ S.tempLuckSpins = (S.tempLuckSpins || 0) + (e.tempLuck.spins||0); S.tempLuckAmt = e.tempLuck.amt || S.tempLuckAmt; }
  if(e.theme){ S.theme = e.theme; applyTheme(); }
  if(e.avatar){ S.avatar = e.avatar; }
  if(e.fx){ S.fx = S.fx || {}; S.fx[e.fx] = true; }

  toast(`Bought ${item.name}!`,'good');
  save(); renderHud(); renderStore(); renderProfile();
  checkAchievements();
}

function useItem(id){
  const item = STORE.find(x=>x.id===id);
  if(!item) return;
  if(!ownedCount(id)){ toast('No item to use','bad'); return; }
  const e = item.effect || {};
  if(e.giveCoins) S.coins += e.giveCoins;
  if(e.giveGems) S.gems += e.giveGems;
  if(e.freeSpins) S.freeSpins += e.freeSpins;
  if(e.reroll) S.rerolls += e.reroll || 1;
  if(e.tempLuck){ S.tempLuckSpins = (S.tempLuckSpins || 0) + (e.tempLuck.spins||0); S.tempLuckAmt = e.tempLuck.amt || S.tempLuckAmt; }
  S.inventory[id] = Math.max(0, ownedCount(id) - 1);
  toast(`${item.name} used!`,'good');
  save(); renderHud(); renderStore();
}

// ---------- THEME ----------
function applyTheme(){
  document.body.className = '';
  if(S.theme && S.theme !== 'default') document.body.classList.add('theme-'+S.theme);
}

// ---------- LEADERBOARD ----------
async function fetchLeaderboard(){
  if(!LB_URL){ return loadLocalLB(); }
  try{
    const r = await fetch(LB_URL);
    if(!r.ok) throw 0;
    return await r.json();
  }catch{ return loadLocalLB(); }
}
function loadLocalLB(){
  try{ return JSON.parse(localStorage.getItem('luckyspin_lb')||'[]'); }catch{ return []; }
}
function saveLocalLB(lb){ localStorage.setItem('luckyspin_lb', JSON.stringify(lb)); }
async function pushLeaderboard(){
  const me = { id: S.username || 'Anon', name: S.username, avatar: S.avatar,
               level: S.level, totalWon: S.totalWon, biggestWin: S.biggestWin,
               updated: Date.now() };
  let lb = await fetchLeaderboard();
  lb = lb.filter(e => e.id !== me.id);
  lb.push(me);
  lb.sort((a,b)=>b.totalWon - a.totalWon);
  lb = lb.slice(0, 100);
  saveLocalLB(lb);
  if(LB_URL){
    try{
      await fetch(LB_URL, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(lb) });
    }catch{}
  }
}
async function renderLeaderboard(){
  const lb = await fetchLeaderboard();
  const tb = $('#lb-table tbody');
  tb.innerHTML = '';
  lb.slice(0,50).forEach((e,i)=>{
    const tr = document.createElement('tr');
    if(e.id === (S.username||'Anon')) tr.className='me';
    tr.innerHTML = `<td>${i+1}</td><td>${e.avatar||'👤'} ${escapeHtml(e.name||'Anon')}</td>
                    <td>${e.level||1}</td><td>${(e.totalWon||0).toLocaleString()} 🪙</td>
                    <td>${(e.biggestWin||0).toLocaleString()} 🪙</td>`;
    tb.appendChild(tr);
  });
}
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }

// ---------- RENDER ----------
function renderHud(){
  $('#hud-coins').textContent = S.coins.toLocaleString();
  $('#hud-gems').textContent = S.gems;
  $('#hud-level').textContent = S.level;
  $('#hud-xp').textContent = S.xp;
  $('#hud-xpneed').textContent = xpNeeded(S.level);
  $('#bet-amount').textContent = S.bet;
}

function renderPaytable(){
  const el = $('#paytable-list');
  el.innerHTML = '';
  SYMBOLS.slice().reverse().forEach(s=>{
    const row = document.createElement('div');
    row.className = 'pt-row';
    row.innerHTML = `<span class="sym">${s.emoji}</span><span>Base ${s.value}</span><span>×10 triple</span>`;
    el.appendChild(row);
  });
}

function renderStore(){
  const cat = document.querySelector('.chip.active')?.dataset.cat || 'all';
  const grid = $('#store-grid');
  grid.innerHTML = '';

  STORE.filter(i => cat==='all' || i.cat===cat).forEach(item=>{
    const cnt = ownedCount(item.id) || (item.defaultOwned?1:0);
    const div = document.createElement('div');
    div.className = 'item' + (cnt>0?' owned':'');
    let btnLabel = `${item.price} ${item.cur==='gems'?'💎':'🪙'}`;
    let canBuy = true;
    if(!meetsRequirements(item)){
      canBuy = false;
      btnLabel = 'Requires item';
    }
    if(item.max && cnt>=item.max){ btnLabel='MAXED'; canBuy=false; }
    else if(!item.consumable && !item.max && cnt>=1 && !item.defaultOwned){ btnLabel='OWNED'; canBuy=false; }

    div.innerHTML = `
      <div class="icon">${item.icon}</div>
      <h4>${item.name}${item.max?` <small>(${cnt}/${item.max})</small>`:''}</h4>
      <p>${item.desc}</p>
      <div class="price">${btnLabel}</div>
      <div class="store-actions"></div>
    `;

    const actions = div.querySelector('.store-actions');

    const buyBtn = document.createElement('button');
    buyBtn.className = 'btn';
    buyBtn.disabled = !canBuy;
    buyBtn.textContent = canBuy ? `Buy (${item.price} ${item.cur==='gems'?'💎':'🪙'})` : btnLabel;
    buyBtn.onclick = ()=> buyItem(item.id);
    actions.appendChild(buyBtn);

    if(item.consumable && cnt > 0){
      const useBtn = document.createElement('button');
      useBtn.className = 'btn primary';
      useBtn.textContent = `Use ×${cnt}`;
      useBtn.onclick = ()=> useItem(item.id);
      actions.appendChild(useBtn);
    }

    if(item.cat === 'avatar' && (cnt > 0 || item.defaultOwned)){
      const eq = document.createElement('button');
      eq.className = 'btn';
      eq.textContent = S.avatar === (item.effect?.avatar) ? 'Equipped' : 'Equip';
      eq.disabled = S.avatar === (item.effect?.avatar);
      eq.onclick = ()=>{
        S.avatar = item.effect.avatar;
        save(); renderProfile(); renderStore();
      };
      actions.appendChild(eq);
    }

    if(item.cat === 'theme' && cnt > 0){
      const tbtn = document.createElement('button');
      tbtn.className = 'btn';
      tbtn.textContent = S.theme === (item.effect?.theme) ? 'Active' : 'Apply';
      tbtn.disabled = S.theme === (item.effect?.theme);
      tbtn.onclick = ()=>{
        S.theme = item.effect.theme;
        applyTheme(); save(); renderStore(); renderProfile();
      };
      actions.appendChild(tbtn);
    }

    grid.appendChild(div);
  });
}

function renderAchievements(){
  S.unlocked = S.unlocked || {};
  const grid = $('#ach-grid');
  grid.innerHTML = '';
  ACHIEVEMENTS.forEach(a=>{
    const curVal = (a.stat === 'unlockedCount') ? Object.keys(S.unlocked || {}).length : (S[a.stat] || 0);
    const cur = Math.min(curVal, a.goal);
    const done = !!S.unlocked[a.id];
    const div = document.createElement('div');
    div.className = 'item' + (done?' owned':'');
    div.innerHTML = `
      <div class="icon">${a.icon}</div>
      <h4>${a.name} ${done?'✅':''}</h4>
      <p>${a.desc}</p>
      <div class="progress"><div style="width:${(cur/a.goal*100)}%"></div></div>
      <div class="tiny">${cur} / ${a.goal}</div>
      <div class="tiny">Reward: ${a.reward.coins||0}🪙 ${a.reward.gems||0}💎</div>
    `;
    grid.appendChild(div);
  });
}

function renderChallenges(){
  rollChallenges();
  const grid = $('#ch-grid');
  grid.innerHTML = '';
  S.challenges.forEach(c=>{
    const t = CHALLENGE_TEMPLATES.find(x=>x.id===c.tplId);
    if(!t) return;
    const cur = Math.min(S[t.stat]||0, c.target);
    const ready = cur >= c.target && !c.claimed;
    const div = document.createElement('div');
    div.className = 'item' + (c.claimed?' owned':'');
    div.innerHTML = `
      <div class="icon">🎯</div>
      <h4>${t.name(c.target)}</h4>
      <div class="progress"><div style="width:${(cur/c.target*100)}%"></div></div>
      <div class="tiny">${cur} / ${c.target}</div>
      <div class="tiny">Reward: ${t.reward.coins||0}🪙 ${t.reward.gems||0}💎</div>
      <button class="btn ${ready?'primary':''}" ${c.claimed||!ready?'disabled':''} data-claim="${c.tplId}">
        ${c.claimed?'Claimed':ready?'Claim!':'In progress'}
      </button>
    `;
    grid.appendChild(div);
  });
  grid.querySelectorAll('[data-claim]').forEach(b=>b.onclick=()=>claimChallenge(b.dataset.claim));
}

function renderProfile(){
  $('#pf-username').value = S.username;
  $('#pf-color').value = S.color;
  $('#pf-avatar').textContent = S.avatar;
  $('#pf-spins').textContent = S.spins;
  $('#pf-won').textContent = S.totalWon.toLocaleString();
  $('#pf-big').textContent = S.biggestWin.toLocaleString();
  $('#pf-jp').textContent = S.jackpots;

  const ar = $('#pf-avatars');
  ar.innerHTML = '';
  STORE.filter(i=>i.cat==='avatar').forEach(i=>{
    const owned = ownedCount(i.id) > 0 || i.defaultOwned;
    const d = document.createElement('div');
    d.className = 'avatar-opt' + (S.avatar===i.effect.avatar?' sel':'') + (owned?'':' locked');
    d.textContent = i.effect.avatar;
    if(owned) d.onclick = ()=>{ S.avatar = i.effect.avatar; save(); renderProfile(); renderStore(); };
    ar.appendChild(d);
  });

  const ts = $('#pf-theme');
  ts.innerHTML = '<option value="default">Default</option>';
  STORE.filter(i=>i.cat==='theme').forEach(i=>{
    if(ownedCount(i.id) > 0){
      const o = document.createElement('option');
      o.value = i.effect.theme; o.textContent = i.name;
      if(S.theme === i.effect.theme) o.selected = true;
      ts.appendChild(o);
    }
  });
}

// ---------- ONBOARDING ----------
function setupOnboarding(){
  const ar = $('#ob-avatars');
  ['🦊','🐱','🐶','🐼','🦁','🐲','👽','🤖','👻'].forEach((a,i)=>{
    const d = document.createElement('div');
    d.className = 'avatar-opt' + (i===0?' sel':'');
    d.textContent = a;
    d.onclick = ()=>{
      ar.querySelectorAll('.avatar-opt').forEach(x=>x.classList.remove('sel'));
      d.classList.add('sel');
      ar.dataset.pick = a;
    };
    ar.appendChild(d);
  });
  ar.dataset.pick = '🦊';

  $('#ob-start').onclick = ()=>{
    const u = $('#ob-username').value.trim();
    if(!u){ toast('Enter a username','bad'); return; }
    S.username = u;
    S.avatar = ar.dataset.pick;
    S.color = $('#ob-color').value;
    const eff = effects();
    S.coins += eff.startCoins || 0;
    save();
    $('#onboarding').classList.add('hidden');
    $('#app').classList.remove('hidden');
    if(eff.autoDaily) claimDaily();
    renderAll();
  };
}

// ---------- TABS ----------
function setupTabs(){
  $$('.tab').forEach(t=>t.onclick=()=>{
    $$('.tab').forEach(x=>x.classList.remove('active'));
    $$('.tab-panel').forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    $('#tab-'+t.dataset.tab).classList.add('active');
    if(t.dataset.tab==='leaderboard') renderLeaderboard();
  });
}

// ---------- BET ----------
function setupBet(){
  const STEPS = [10,25,50,100,250,500,1000,2500,5000,10000,25000];
  const i = ()=> STEPS.indexOf(S.bet);
  $('#bet-down').onclick = ()=>{
    let idx = i(); if(idx<0) idx=1;
    if(idx>0){ S.bet = STEPS[idx-1]; save(); renderHud(); }
  };
  $('#bet-up').onclick = ()=>{
    let idx = i(); if(idx<0) idx=0;
    const eff = effects();
    if(idx<STEPS.length-1 && STEPS[idx+1] <= eff.maxBet){ S.bet = STEPS[idx+1]; save(); renderHud(); }
    else toast('Max bet reached (buy High Roller to unlock more)');
  };
  $('#bet-max').onclick = ()=>{
    const eff = effects();
    for(let k=STEPS.length-1;k>=0;k--){ if(STEPS[k]<=eff.maxBet && STEPS[k]<=S.coins){ S.bet=STEPS[k]; break; } }
    save(); renderHud();
  };
}

// ---------- INIT ----------
function init(){
  setupOnboarding();
  setupTabs();
  setupBet();
  $('#spin-btn').onclick = ()=>spin(false);
  $('#daily-btn').onclick = claimDaily;
  $('#lb-refresh').onclick = renderLeaderboard;
  $$('.chip').forEach(c=>c.onclick=()=>{
    $$('.chip').forEach(x=>x.classList.remove('active'));
    c.classList.add('active');
    renderStore();
  });
  $('#pf-save').onclick = ()=>{
    S.username = $('#pf-username').value.trim() || 'Player';
    S.color = $('#pf-color').value;
    S.theme = $('#pf-theme').value;
    save(); applyTheme(); renderHud();
    toast('Saved!','good');
  };
  $('#pf-reset').onclick = ()=>{
    if(confirm('Reset all progress? This cannot be undone.')){
      localStorage.removeItem('luckyspin');
      location.reload();
    }
  };

  if(!S.username){
    $('#onboarding').classList.remove('hidden');
    $('#app').classList.add('hidden');
  } else {
    $('#onboarding').classList.add('hidden');
    $('#app').classList.remove('hidden');
    const eff = effects();
    if(eff.autoDaily && Date.now()-S.lastDaily > 86400000) claimDaily();
    renderAll();
  }

  setInterval(()=>{
    if($('#tab-leaderboard').classList.contains('active')) renderLeaderboard();
  }, 30000);
}

function renderAll(){ renderHud(); renderPaytable(); renderStore(); renderAchievements(); renderChallenges(); renderProfile(); applyTheme(); }

init();
