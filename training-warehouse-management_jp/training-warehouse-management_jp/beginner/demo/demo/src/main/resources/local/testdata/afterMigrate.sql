DELETE FROM example_user;
DELETE FROM example_stock;
DELETE FROM example_order;
DELETE FROM example_menu;

INSERT INTO example_user (user_id, password) VALUES ('user1', 'password1');
INSERT INTO example_stock (item_id, amount) VALUES (1, 3);
INSERT INTO example_order (item_id, name, amount, order_status, order_date)
VALUES
(1, 'PO-001', 3, 'PENDING', '2019-01-01')
,(2, 'PO-002', 2, 'PENDING', '2022-01-01')
,(3, 'PO-003', 3, 'PENDING', '2022-01-01')
;
INSERT INTO example_menu (id, name, price) VALUES
(1, 'carrot', 50)
,(2, '玉ねぎ', 100)
,(3, '和牛', 500)
;

