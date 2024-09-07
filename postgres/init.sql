COPY participants(pn_lot, supplier, is_winner)
FROM 'data/training_participants_intens_spb_20240904.csv' DELIMITER ';' CSV HEADER;
