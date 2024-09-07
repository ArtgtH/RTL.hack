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


def calculate_distance_stats(regions: list, target_region: int) -> tuple:
    if not regions:
        raise ValueError("Список регионов не может быть пустым")

    distances = [calculate_distance(region, target_region) for region in regions]
    min_distance = min(distances)
    avg_distance = sum(distances) / len(distances)

    return min_distance, avg_distance, len(distances)


def get_region_for_supplier(supplier: str, file_path=r'utils\supplier_regions.json') -> list:
    script_dir = os.path.dirname(__file__)
    file_path = os.path.join(script_dir, file_path)
    with open(file_path, 'r', encoding='utf-8') as file:
        supplier_region = json.load(file)
    regions = supplier_region.get(str(supplier))
    return regions


def get_dists_for_supplier(supplier: str, target_region: int) -> tuple:
    regions = get_region_for_supplier(supplier=supplier)

    return calculate_distance_stats(regions=regions, target_region=target_region)


# # Пример использования
# supplier = 'Поставщик_18354'
# target_region = 3
# print(get_dists_for_supplier(supplier=supplier, target_region=target_region))