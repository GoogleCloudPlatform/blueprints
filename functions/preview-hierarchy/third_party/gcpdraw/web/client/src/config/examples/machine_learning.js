const code = `meta {
  title "Machine Learning"
}

elements {
  gcp {
    group preprocess {
      name "1. Preprocess"
      card gcs as gcs_raw {
        name "Raw data"
      }
      card dataflow as df_preprocess
      card gcs as gcs_preprocessed {
        name "Preprocessed data"
      }
    }
    
    group train {
      name "2. Train Model"
      card gcs as gcs_preprocessed2 {
        name "Preprocessed data"
      }
      card ml_engine as mle_train {
        name "Training"
      }
      card gcs as gcs_trained {
        name "Trained model"
      }
    }
    
    group deploy {
      name "3. Deploy"
      card gcs as gcs_model {
        name "Trained model"
      }
      card ml_engine as mle_serve {
        name "Serving"
      }
      
      group ml_framework {
        name "ML Frameworks"

        card tensorflow
        card scikit_learn
      }
    }
  }
}

paths {
  gcs_raw --> df_preprocess
  df_preprocess --> gcs_preprocessed
  
  gcs_preprocessed2 --> mle_train
  mle_train --> gcs_trained
  
  gcs_model --> mle_serve
  mle_serve .. ml_framework
  
  preprocess (-down->) train
  train (-down->) deploy
}
`
export default code;
