using UnityEngine;
using UnityEngine.AddressableAssets;
using UnityEngine.ResourceManagement.AsyncOperations;
using UnityEngine.SceneManagement;
using System.Collections;
using System.Collections.Generic;

public class LoadingAssets : MonoBehaviour{
    public string label = "load_assets";
    public UnityEngine.UI.Slider progressBar;
    public float delayAfterLoading = 0.5f;
    private List<AsyncOperationHandle> loadedHandles = new();
    private float targetProgress = 0f;
    private bool isLoading = false;
    public GameObject FadeOutToMenu;

    void Start(){
        StartCoroutine(LoadAllAddressableAssets());
    }

    void Update(){
        if (progressBar != null && isLoading){
            progressBar.value = Mathf.Lerp(progressBar.value, targetProgress, Time.deltaTime * 6f);
        }
    }

    IEnumerator LoadAllAddressableAssets(){
        isLoading = true;

        var locationsHandle = Addressables.LoadResourceLocationsAsync(label);
        yield return locationsHandle;

        if (locationsHandle.Status != AsyncOperationStatus.Succeeded){
            Debug.LogError("Failed to load resource locations for label: " + label);
            yield break;
        }

        var locations = locationsHandle.Result;
        int total = locations.Count;
        int loaded = 0;

        foreach (var location in locations){
            var handle = Addressables.LoadAssetAsync<Object>(location);
            loadedHandles.Add(handle);

            while (!handle.IsDone){
                targetProgress = (float)loaded / total + (handle.PercentComplete / total);
                yield return null;
            }

            if (handle.Status == AsyncOperationStatus.Succeeded){
                Object asset = handle.Result;
                Debug.Log("Loaded: " + asset.name);
            }
            else{
                Debug.LogWarning("Failed to load asset: " + location.PrimaryKey);
            }

            loaded++;
            targetProgress = (float)loaded / total;
        }

        Debug.Log("All assets with label " + label + " loaded.");
        targetProgress = 1f;

        yield return new WaitForSeconds(delayAfterLoading);
        isLoading = false;

        FadeOutToMenu.SetActive(true);
    }

    private void OnDestroy(){
        foreach (var handle in loadedHandles){
            Addressables.Release(handle);
        }
    }
}