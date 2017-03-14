# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Item.create name: "cool jacket", on_sale: false, stock: 15, size: 2, color: "cool", line: "cool", price: 15.99, description: "very cool", url: "http://i.imgur.com/Oqa7MgD.png"