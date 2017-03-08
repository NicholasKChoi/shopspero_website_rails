# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170308082302) do

  create_table "categories", force: :cascade do |t|
    t.string   "name"
    t.integer  "order"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "ancestry"
  end

  add_index "categories", ["ancestry"], name: "index_categories_on_ancestry"

  create_table "category_items", id: false, force: :cascade do |t|
    t.integer  "category_id"
    t.integer  "item_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "category_items", ["category_id"], name: "index_category_items_on_category_id"
  add_index "category_items", ["item_id"], name: "index_category_items_on_item_id"

  create_table "items", force: :cascade do |t|
    t.string   "name"
    t.boolean  "on_sale"
    t.integer  "stock"
    t.integer  "size"
    t.string   "color"
    t.string   "line"
    t.decimal  "price",       precision: 8, scale: 2
    t.text     "description"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "url"
  end

  create_table "ordered_items", force: :cascade do |t|
  end

  create_table "orders", force: :cascade do |t|
    t.string   "address"
    t.datetime "ordered_at"
    t.datetime "updated_at"
    t.datetime "expire_time"
    t.decimal  "price"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "first_name"
    t.string "last_name"
  end

end
