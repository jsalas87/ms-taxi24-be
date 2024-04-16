INSERT INTO public.driver (full_name, sex, birth_date, available, last_location)
VALUES
    ('Maho R', 'Female', '1991-05-23', true, '0101000020E61000001CA6C7009A883C40446E861BF05B54C0'),
    ('Gael A', 'Male', '1990-10-23', true, '0101000020E61000000B3BD6D699883C402C2CB81FF05B54C0'),
    ('Jose D', 'Male', '1998-11-15', false, '0101000020E61000000B3BD6D699883C40790E1B1BF05B54C0'),
    ('Maria D', 'Female', '1986-09-12', true, '0101000020E6100000FC51D4997B9E3C404F82ED16375154C0'),
    ('Camilo A', 'Male', '1988-11-15', true, '0101000020E6100000AB329DE799883C402C2CB81FF05B54C0'),
    ('Juan S', 'Male', '1987-10-18', true, '0101000020E61000004C2A64F899883C40790E1B1BF05B54C0');

INSERT INTO public.invoice (date, active, subtotal, tax, total, passenger_id)
VALUES
	('2024-04-15',	true,	73,	11.68,	84.68,	1),
	('2024-04-15',	true,	3,	0.48,	3.48,	1);
	
INSERT INTO public.invoice_detail (quantity, description, price, total, invoice_number)
VALUES
	(1,	'Traslado 28.5336994,-81.4365399',	73.00,	73.00,	1)
	(1,	'Traslado 28.5336974,-81.436541',	3.00,	3.00,	2);
	
INSERT INTO public.passenger (dni, full_name, direccion, phone)
VALUES
    ('19482290', 'Eliot P', 'Caracas', '1597079'),
    ('20482290', 'Dina R', 'Orlando', '1607079'),
    ('21482290', 'Andre L', 'Santo Domingo', '1617079');

INSERT INTO public.trip (origin, destination, active, finished, cost, date, driver_id, passenger_id)
VALUES
    ('0101000020E61000004C2A64F899883C40790E1B1BF05B54C0', '0101000020E610000013E51C86A0883C408B790C45F05B54C0', false, true, 73, '2024-04-15', 1, 1),
    ('0101000020E61000000B3BD6D699883C402C2CB81FF05B54C0', '0101000020E6100000D2F58E64A0883C403E97A949F05B54C0', false, true, 3, '2024-04-15', 1, 1);
