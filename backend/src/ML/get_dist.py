import json
import math
import os

def calculate_distance(region1, region2, file_path=r'utils\reg_coords.json'):
    script_dir = os.path.dirname(__file__)
    file_path = os.path.join(script_dir, file_path)
    with open(file_path, 'r') as file:
        region_coords = json.load(file)

    coords1 = region_coords.get(str(region1))
    coords2 = region_coords.get(str(region2))

    if not coords1 or not coords2:
        raise ValueError(f"Координаты одного или обоих регионов не найдены: {region1}, {region2}")

    distance = math.sqrt((coords2[0] - coords1[0])**2 + (coords2[1] - coords1[1])**2)

    return distance


# # Пример использования
# distance = calculate_distance(1, 2)
# print(f"Расстояние: {distance}")
